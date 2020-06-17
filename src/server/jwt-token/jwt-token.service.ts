import {Inject, Injectable} from '@nestjs/common';
import {CreateAccountTokenDto} from "../../common/dto/auth/create-account-token.dto";
import {Token} from "./repository/token.entity";
import {TokenRepository} from "./repository/token.repository";

@Injectable()
export class JwtTokenService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private readonly tokenRepository: TokenRepository
    ) {}

    async create(createAccountTokenDto: CreateAccountTokenDto): Promise<Token> {
        return this.tokenRepository.createToken(createAccountTokenDto)
    }
}
