import {BadRequestException, Injectable} from '@nestjs/common';
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


@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
        private readonly tokenService: JwtTokenService
    ) {
    }

    async signUp(createAccountDto: CreateAccountDto): Promise<boolean> {
        const user = await this.accountService.create(createAccountDto)
        return true
    }

    async signIn({ email, password }: SignInDto): Promise<IReadableAccount> {
        const account = await this.accountService.findByEmail(email)
        if (account && (await bcrypt.compare(password, account.password))) {
            const tokenPayload = {
                id: account.id,
                email: account.email,
            }
            const token = await this.generateToken(tokenPayload)
            const expiresAt = moment()
                .add(1, 'day')
                .toDate()

            await this.saveToken({
                token,
                expiresAt,
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


    private async saveToken(createUserTokenDto: CreateAccountTokenDto) {
        return await this.tokenService.create(createUserTokenDto)
    }

    //TODO: Реализовать
    async changePassword() {

    }

    //TODO: Реализовать
    async sendEmailConfirmation() {

    }

    //TODO: Реализовать
    async confirm() {

    }

}
