import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {SubAccount} from "./repository/subaccount.entity";
import {Repository} from "typeorm";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {Account} from "../account/repository/account.entity";
import {ContactsService} from "../contacts/contacts.service";
import {CategoryService} from "../category/category.service";
import {ServicesService} from "../services/services.service";
import {Category} from "../category/repository/category.entity";
import {SubAccountCategoryEnum} from "../../../common/enum/subaccount/subaccount-category.enum";

@Injectable()
export class SubAccountService {

    constructor(
        @Inject('SUBACCOUNT_REPOSITORY')
        private readonly subAccountRepository: Repository<SubAccount>,
        private readonly contactsService: ContactsService,
        private readonly categoryService: CategoryService,
        private readonly servicesService: ServicesService,
    ) {
    }

    async create(account: Account, createSubAccountDto: CreateSubAccountDto): Promise<SubAccount> {
        let subAccount = new SubAccount()

        subAccount.account = account
        if (subAccount.account === undefined)
            throw new NotFoundException('Такого аккаунта не существует')

        subAccount.title = createSubAccountDto.title
        subAccount.description = createSubAccountDto.description
        subAccount.category = await this.getCategory(createSubAccountDto.category)
        subAccount.services = await this.servicesService.findByIds(createSubAccountDto.services)
        subAccount.contacts = await this.contactsService.create(createSubAccountDto)

        return this.subAccountRepository.save(subAccount);
    }

    private async getCategory(categoryFromDto: SubAccountCategoryEnum): Promise<Category> {
        const category = await this.categoryService.findByName(categoryFromDto)
        if (category === undefined)
            throw new NotFoundException('Не найдена категория магазина')

        return category
    }
}
