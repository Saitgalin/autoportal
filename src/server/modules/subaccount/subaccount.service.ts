import {BadRequestException, ForbiddenException, Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {SubAccount} from "./repository/subaccount.entity";
import {Repository} from "typeorm";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {Account} from "../account/repository/account.entity";
import {ContactsService} from "../contacts/contacts.service";
import {CategoryService} from "../category/category.service";
import {ServicesService} from "../services/services.service";
import {Category} from "../category/repository/category.entity";
import {SubAccountCategoryEnum} from "../../../common/enum/subaccount/subaccount-category.enum";
import {SubAccountPhotoService} from "../subaccount-photo/subaccount-photo.service";
import {SubAccountPhoto} from "../subaccount-photo/repository/subaccount-photo.entity";

@Injectable()
export class SubAccountService {

    constructor(
        @Inject('SUBACCOUNT_REPOSITORY')
        private readonly subAccountRepository: Repository<SubAccount>,
        private readonly contactsService: ContactsService,
        private readonly categoryService: CategoryService,
        private readonly servicesService: ServicesService,
        private readonly subAccountPhotoService: SubAccountPhotoService
    ) {
    }

    async all(): Promise<SubAccount[]> {
        return await this.subAccountRepository.find()
    }

    async uploadPhoto(account: Account, file, subAccountId: number): Promise<SubAccountPhoto> {
        const subAccounts = await this.subAccountRepository.find({
            where: {
                account: account
            }
        })
        const subAccount: SubAccount = subAccounts.find(
            subAccount => subAccount.id === subAccountId
        )

        if (subAccount === undefined) {
            throw new BadRequestException(`У аккаунта нет магазина с id ${subAccountId}`)
        }

        return await this.subAccountPhotoService.addPhoto(subAccount, file)
    }

    async findByCities(city: string) {
        return await this.subAccountRepository.query(
            `SELECT 
            sub_account.id, c."phoneNumber",
            a.street, a."houseNumber", 
            sub_account.title, sub_account.description
            FROM sub_account 
            LEFT JOIN contacts c on sub_account."contactsId" = c.id 
            LEFT JOIN address a on c.id = a."contactsId"
            LEFT JOIN city c2 on a."cityId" = c2.id 
            WHERE c2.title = '${city}'`
        )
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
