import {
    BadRequestException,
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException
} from '@nestjs/common';
import {Account} from "./repository/account.entity";
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";
import {AccountRepository} from "./repository/account.repository";
import * as bcrypt from 'bcrypt'
import {Token} from "../jwt-token/repository/token.entity";
import {EditAccountDto} from "../../../common/dto/auth/edit-account.dto";
import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";
import {StatusEnum} from "../../../common/enum/account/status.enum";
import {AuthService} from "../auth/auth.service";
import {Utils} from "../../utils/utils";
import {JwtTokenService} from "../jwt-token/jwt-token.service";


@Injectable()
export class AccountService {
    private readonly saltRounds = 10;
    constructor(
        @Inject('ACCOUNT_REPOSITORY')
        private readonly accountRepository: AccountRepository,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        private readonly tokenService: JwtTokenService
    ) {
    }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const hash = await this.hashPassword(createAccountDto.password)
        return await this.accountRepository.createAccount(createAccountDto, hash)
    }

    async findByEmail(email: string): Promise<Account> {
        return await this.accountRepository.findOne(
            { where: {
                email: email
            }}
        );
    }

    async findByToken(token: Token): Promise<Account> {
        return await this.accountRepository.findOneOrFail(
            {where: {jwtToken: token}}
        )
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds)
        return await bcrypt.hash(password, salt)
    }

    async findById(id: number): Promise<Account> {
        return await this.accountRepository.findOneOrFail({where: {id: id}})
    }

    async update(account: Account) {
        return await this.accountRepository.update({id: account.id}, account)
    }

    async smsCodeConfirm(account: Account, code: string): Promise<void> {
        if (account.status != StatusEnum.phoneNumberPending
            && account.status != StatusEnum.emailAndPhonePending)
            throw new BadRequestException('Аккаунт не нуждается в подтверждении номера телефона')

        Logger.debug(account.smsCode)
        Logger.error(code)
        Logger.warn(Number(code))
        if (account.smsCode !== Number(code))
            throw new ConflictException('Неверный код')

        if (StatusEnum.emailAndPhonePending) {
            account.status = StatusEnum.emailPending
        } else {
            account.status = StatusEnum.active
        }

        const result = await this.update(account)
        Logger.debug(result)
    }

    async emailConfirm(token: string): Promise<boolean> {
        const data = await this.authService.verifyToken(token)
        const account = await this.findById(data.id)
        const tokenExists = await this.tokenService.exists(account, token)

        if (!tokenExists)
            throw new UnauthorizedException()

        await this.tokenService.delete(account, token)

        if (!account || (account.status !== StatusEnum.emailPending && account.status !== StatusEnum.emailAndPhonePending))
            throw new BadRequestException('Аккаунт не нуждается в подтверждении email')

        if (account.status === StatusEnum.emailAndPhonePending) {
            account.status = StatusEnum.phoneNumberPending
        } else {
            account.status = StatusEnum.active
        }
        await this.update(account)
        return true
    }

    async edit(account: Account, editAccountDto: EditAccountDto): Promise<IReadableAccount> {
        const firstName = editAccountDto.firstName
        const lastName = editAccountDto.lastName
        const middleName = editAccountDto.middleName
        const birthDate = editAccountDto.birthDate

        if (Utils.checkNotNull(firstName))
            account.firstName = firstName
        if (Utils.checkNotNull(lastName))
            account.lastName = lastName
        if (Utils.checkNotNull(middleName))
            account.middleName = middleName
        if (Utils.checkNotNull(birthDate))
            account.birthDate = birthDate

        const inputEmail = editAccountDto.email
        const inputPhone = editAccountDto.phone

        //TODO: нужно что-то с этим кодом делать, думаю...
        if (Utils.checkNotNull(inputEmail) && Utils.checkNotNull(inputPhone)) {
            account = await this.changeEmailAndPhone(account, inputEmail, inputPhone)
        } else if (Utils.checkNotNull(inputPhone)) {
            account = await this.changePhone(account, inputPhone)
        } else if (Utils.checkNotNull(inputEmail)) {
            account = await this.changeEmail(account, inputEmail)
        }

        const results = await this.update(account)
        Logger.debug(results)
        return account
    }

    private async changeEmail(account: Account, email: string): Promise<Account> {
        account.status = StatusEnum.emailPending
        account.email = email
        await this.authService.sendEmailConfirmation(account)
        return account
    }

    private async changePhone(account: Account, phone: string): Promise<Account> {
        account.status = StatusEnum.phoneNumberPending
        account.phone = phone
        await this.authService.sendSmsConfirmation(account)
        return account
    }

    private async changeEmailAndPhone(account: Account, email: string, phone: string): Promise<Account> {
        //этот статус нужен для метода подтверждения email или номера телефона, чтобы после него не ставился active
        account.email = email
        account.phone = phone
        await this.authService.sendSmsConfirmation(account)
        account.status = StatusEnum.emailAndPhonePending
        return account
    }


}
