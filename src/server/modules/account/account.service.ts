import {Inject, Injectable} from '@nestjs/common';
import {Account} from "./repository/account.entity";
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";
import {AccountRepository} from "./repository/account.repository";
import * as bcrypt from 'bcrypt'
import {Token} from "../jwt-token/repository/token.entity";


@Injectable()
export class AccountService {
    private readonly saltRounds = 10;
    constructor(
        @Inject('ACCOUNT_REPOSITORY')
        private readonly accountRepository: AccountRepository,
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
}
