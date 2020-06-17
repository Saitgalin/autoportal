import {EntityRepository, Repository} from "typeorm";
import {Token} from "./token.entity";
import {CreateAccountTokenDto} from "../../../common/dto/auth/create-account-token.dto";
import * as _ from "lodash";

@EntityRepository(Token)
export class TokenRepository extends Repository<Token>{

    async createToken(createAccountTokenDto: CreateAccountTokenDto): Promise<Token> {
        return await this.save(_.assignIn(createAccountTokenDto))
    }

}