import {
    BadRequestException,
    ConflictException,
    forwardRef,
    HttpService,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException
} from '@nestjs/common';
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";
import {AccountService} from "../account/account.service";
import {SignInDto} from "../../../common/dto/auth/sign-in.dto";
import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";
import {SignOptions} from 'jsonwebtoken';
import {JwtService} from '@nestjs/jwt';
import * as _ from "lodash";
import * as bcrypt from 'bcrypt'
import {CreateAccountTokenDto} from "../../../common/dto/auth/create-account-token.dto";
import {JwtTokenService} from "../jwt-token/jwt-token.service";
import {ConfigService} from "@nestjs/config";
import {Account} from "../account/repository/account.entity";
import {MailService} from "../mail/mail.service";
import {ITokenPayload} from "./interfaces/token-payload.interface";
import {SmsService} from "../sms/sms.service";
import {randomInteger} from "../../utils/rand";
import {RegistrationStatusEnum} from "../../../common/enum/account/registration-status.enum";
import moment = require("moment");

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string

    constructor(
        @Inject(forwardRef(() => AccountService))
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
        private readonly tokenService: JwtTokenService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
        private readonly httpService: HttpService,
        private readonly smsService: SmsService
    ) {
        this.clientAppUrl = configService.get<string>('CLIENT_APP_URL')
    }

    async signUp(createAccountDto: CreateAccountDto): Promise<boolean> {
        const account = await this.accountService.create(createAccountDto)
        await this.sendSmsConfirmation(account)
        return true
    }

    async signIn({email, password}: SignInDto): Promise<IReadableAccount> {
        const account = await this.accountService.findByEmail(email)

        if (account && (await bcrypt.compare(password, account.password))) {
            const tokenPayload: ITokenPayload = {
                id: account.id,
                fio: account.firstName + ' ' + account.middleName + ' ' + account.lastName,
                email: account.email
            }
            const token = await this.generateToken(tokenPayload)
            const expiresAt = moment()
                .add(1, 'day')
                .toDate()

            await this.saveToken({
                jwtToken: token,
                expiresAt: expiresAt,
                account: account
            })

            const readableUser = account as IReadableAccount
            readableUser.accessToken = token

            return _.omit<any>(readableUser) as IReadableAccount
        }
        throw new BadRequestException('Логин или пароль неверны, пожалуйста попробуйте снова')
    }

    private async generateToken(data, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options)
    }

    //TODO: Убрать после тестов
    async smsTest(): Promise<Boolean> {
        return await this.smsService.authTest()
    }

    //TODO: Методы по отправке подтверждения, и подобные ему вынести в другой модуль
    async sendSmsConfirmation(account: Account) {
        const generatedSmsCode = randomInteger(100000, 999999)
        //TODO: fix sendSMS
        //await this.smsService.sendSms(Number(account.phone), generatedSmsCode)
        account.smsCode = generatedSmsCode
        await this.accountService.update(account)
    }

    async registrationSmsConfirm(account: Account, code: number): Promise<boolean> {
        if ((account.registrationStatus !== RegistrationStatusEnum.phoneNumberPending) || account.smsCode == null)
            throw new BadRequestException('Аккаунт не нуждается в подтверждении номера телефона')
        if (account.smsCode !== code)
            throw new ConflictException('Неверный код')

        account.registrationStatus = RegistrationStatusEnum.confirmRulesPending
        await this.accountService.update(account)
        return true
    }

    async registrationRulesConfirm(account: Account): Promise<boolean> {
        if (account.registrationStatus !== RegistrationStatusEnum.confirmRulesPending)
            throw new BadRequestException('Аккаунт не нуждается в подтверждении правил')

        account.registrationStatus = RegistrationStatusEnum.emailPending
        await this.accountService.update(account)

        //TODO: ДОБАВИТЬ СТРОЧКУ СНИЗУ НА ПРОД
        //await this.sendEmailConfirmation(account)
        return true
    }

    //TODO: in future send confirmation
    async sendEmailConfirmation(account: Account) {
        const expiresIn = 60 * 60 * 24 //24 hours
        const tokenPayload: ITokenPayload = {
            id: account.id,
            fio: account.firstName + ' ' + account.middleName + ' ' + account.lastName,
            email: account.email
        }
        const expiresAt = moment().add(1, 'day').toDate()

        const token = await this.generateToken(tokenPayload, {expiresIn})
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`

        await this.saveToken({jwtToken: token, account: account, expiresAt: expiresAt})
        const response = await this.mailService.send({
            from: this.configService.get<string>('JS_CODE_MAIL'),
            to: account.email,
            subject: 'Подтверждение пользователя',
            html: `
          <h3>Здравствуйте ${account.firstName}</h3>
          <p>Пожалуйста используйте эту ссылку <a href="${confirmLink}">link</a> для подтверждения вашего аккаунта.</p>
        `,
        })
        Logger.debug(response)
    }

    async registrationEmailConfirm(token: string): Promise<boolean> {
        const data = this.jwtService.verify(token) as ITokenPayload
        const account = await this.accountService.findById(data.id)
        const tokenExists = await this.tokenService.exists(account, token)

        if (!tokenExists)
            throw new UnauthorizedException()

        await this.tokenService.delete(account, token)

        if (!account || (account.registrationStatus !== RegistrationStatusEnum.emailPending))
            throw new BadRequestException('Аккаунт не нуждается в подтверждении email')

        account.registrationStatus = RegistrationStatusEnum.registered
        await this.accountService.update(account)
        return true
    }

    async verifyToken(token: string): Promise<ITokenPayload> {
        return await this.jwtService.verify(token) as ITokenPayload
    }


    private async saveToken(createUserTokenDto: CreateAccountTokenDto) {
        return await this.tokenService.create(createUserTokenDto)
    }

    getIp(req: any) {
        return (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress
    }

    cityByIp(ip: any) {
        return this.httpService
            .get(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}`)
            .toPromise()
    }

    //TODO: Реализовать
    async changePassword() {

    }
}
