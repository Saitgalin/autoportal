import {Inject, Injectable} from '@nestjs/common';
import {CreateAccountTokenDto} from "../../common/dto/auth/create-account-token.dto";
import {Token} from "./repository/token.entity";
import {TokenRepository} from "./repository/token.repository";
import {Account} from "../account/repository/account.entity";


@Injectable()
export class JwtTokenService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private readonly tokenRepository: TokenRepository
    ) {}

    async create(createAccountTokenDto: CreateAccountTokenDto): Promise<Token> {
        return this.tokenRepository.createToken(createAccountTokenDto)
    }

    async delete(account: Account, token: string) {
        const findedToken = await this.find(account, token)
        return await this.tokenRepository.delete(findedToken)
    }

    async find(account: Account, token: string) {
        return await this.tokenRepository.findOne({
            where: {
                account: account,
                token: token
            }
        })
    }

    async exists(account: Account, token: string) {
        const findedToken = await this.find(account, token)
        return findedToken !== null && findedToken !== undefined;
    }
}
