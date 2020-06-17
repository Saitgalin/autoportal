import {EntityRepository, Repository} from "typeorm";
import {Account} from "./account.entity";
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";
import * as _ from "lodash";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account>{
    async createAccount (createAccountDto: CreateAccountDto, hash: string): Promise<Account> {
        return await this.save(_.assignIn(createAccountDto, {password: hash}),)
    }
}