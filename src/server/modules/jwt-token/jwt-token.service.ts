import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateAccountTokenDto} from "../../../common/dto/auth/create-account-token.dto";
import {Token} from "./repository/token.entity";
import {TokenRepository} from "./repository/token.repository";
import {Account} from "../account/repository/account.entity";
import {AccountService} from "../account/account.service";


@Injectable()
export class JwtTokenService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private readonly tokenRepository: TokenRepository,
        @Inject(forwardRef(() => AccountService))
        private readonly accountService: AccountService
    ) {}

    async create(createAccountTokenDto: CreateAccountTokenDto): Promise<Token> {
        return this.tokenRepository.createToken(createAccountTokenDto)
    }

    async accountByToken(token: string): Promise<Account> {
        const query = `SELECT "accountId" FROM token WHERE "jwtToken" = '${token}'`
        const accountId = await this.tokenRepository.query(query)
        return await this.accountService.findById(accountId[0].accountId)
    }

    async delete(account: Account, token: string) {
        const findedToken = await this.find(account, token)
        return await this.tokenRepository.delete(findedToken)
    }

    async find(account: Account, token: string) {
        return await this.tokenRepository.findOne({
            where: {
                account: account,
                jwtToken: token
            }
        })
    }


    async exists(account: Account, token: string) {
        const findedToken = await this.find(account, token)
        return findedToken !== undefined && findedToken !== null
    }

    async existsById(accountId: number, token: string) {
        const account = await this.accountService.findById(accountId)
        const findedToken = await this.find(account, token)
        return findedToken !== undefined && findedToken !== null
    }
}
