import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {SubAccount} from "./repository/subaccount.entity";
import {Repository} from "typeorm";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {Account} from "../account/repository/account.entity";
import {ContactsService} from "../contacts/contacts.service";
import {CategoryService} from "../category/category.service";
import {ServicesService} from "../services/services.service";

@Injectable()
export class SubAccountService {

    constructor(
        @Inject('SUBACCOUNT_REPOSITORY')
        private readonly subAccountRepository: Repository<SubAccount>,
        private readonly contactsService: ContactsService,
        private readonly categoryService: CategoryService,
        private readonly servicesService: ServicesService
    ) {
    }

    async create(account: Account, createSubAccountDto: CreateSubAccountDto): Promise<SubAccount> {
        let subAccount = new SubAccount()
        subAccount.account = account
        subAccount.contacts = await this.contactsService.create(createSubAccountDto, subAccount)
        subAccount.title = createSubAccountDto.title
        subAccount.description = createSubAccountDto.description

        const category = await this.categoryService.findByName(createSubAccountDto.category)
        if (category === undefined)
            throw new NotFoundException('Не найдена категория магазина')
        subAccount.category = category

        subAccount.services = await this.servicesService.findByIds(createSubAccountDto.services)
        return this.subAccountRepository.create(subAccount);
    }
}
