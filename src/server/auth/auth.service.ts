import {BadRequestException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {CreateAccountDto} from "../../common/dto/auth/create-account.dto";
import {AccountService} from "../account/account.service";
import {SignInDto} from "../../common/dto/auth/sign-in.dto";
import {IReadableAccount} from "../../common/readable/account/IReadableAccount";
import {SignOptions} from 'jsonwebtoken';
import {JwtService} from '@nestjs/jwt';
import * as _ from "lodash";
import * as bcrypt from 'bcrypt'
import {CreateAccountTokenDto} from "../../common/dto/auth/create-account-token.dto";
import {JwtTokenService} from "../jwt-token/jwt-token.service";
import moment = require("moment");
import {ConfigService} from "@nestjs/config";
import {Account} from "../account/repository/account.entity";
import {MailService} from "../mail/mail.service";
import {ITokenPayload} from "./interfaces/token-payload.interface";
import {StatusEnum} from "../../common/enum/account/status.enum";
import {UpdateResult} from "typeorm";


@Injectable()
export class AuthService {
    private readonly clientAppUrl: string

    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
        private readonly tokenService: JwtTokenService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService
    ) {
        this.clientAppUrl = configService.get<string>('CLIENT_APP_URL')
    }

    async signUp(createAccountDto: CreateAccountDto): Promise<boolean> {
        const account = await this.accountService.create(createAccountDto)
        await this.sendEmailConfirmation(account)
        return true
    }

    async signIn({email, password}: SignInDto): Promise<IReadableAccount> {
        const account = await this.accountService.findByEmail(email)

        if (account && (await bcrypt.compare(password, account.password))) {
            const tokenPayload: ITokenPayload = {
                id: account.id,
                fio: account.fio,
                email: account.email
            }
            const token = await this.generateToken(tokenPayload)
            const expiresAt = moment()
                .add(1, 'day')
                .toDate()

            await this.saveToken({
                token: token,
                expiresAt: expiresAt,
                account: account
            })

            const readableUser = account as IReadableAccount
            readableUser.accessToken = token

            return _.omit<any>(readableUser) as IReadableAccount
        }
        throw new BadRequestException('Invalid credentials')
    }

    private async generateToken(data, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options)
    }

    async sendEmailConfirmation(account: Account) {
        const expiresIn = 60 * 60 * 24 //24 hours
        const tokenPayload: ITokenPayload = {
            id: account.id,
            fio: account.fio,
            email: account.email
        }
        const expiresAt = moment().add(1, 'day').toDate()

        const token = await this.generateToken(tokenPayload, {expiresIn})
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`

        await this.saveToken({token: token, account: account, expiresAt: expiresAt})
        const response = await this.mailService.send({
            from: this.configService.get<string>('JS_CODE_MAIL'),
            to: account.email,
            subject: 'Подтверждение пользователя',
            html: `
          <h3>Здравствуйте ${account.fio}</h3>
          <p>Пожалуйста используйте эту ссылку <a href="${confirmLink}">link</a> для подтверждения вашего аккаунта.</p>
        `,
        })
        Logger.debug(response)
    }

    async emailConfirm(token: string): Promise<boolean> {
        const data = this.jwtService.verify(token) as ITokenPayload
        const account = await this.accountService.findById(data.id)
        const tokenExists = await this.tokenService.exists(account, token)

        if (!tokenExists)
            throw new UnauthorizedException()

        await this.tokenService.delete(account, token)

        if (!account || account.status !== StatusEnum.emailPending)
            throw new BadRequestException('Confirmation error')

        account.status = StatusEnum.active
        await this.accountService.update(account)
        return true
    }

    private async saveToken(createUserTokenDto: CreateAccountTokenDto) {
        return await this.tokenService.create(createUserTokenDto)
    }

    //TODO: Реализовать
    async changePassword() {

    }
}
