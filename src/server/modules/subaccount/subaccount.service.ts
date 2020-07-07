import {BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {SubAccount} from "./repository/subaccount.entity";
import {Repository} from "typeorm";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {Account} from "../account/repository/account.entity";
import {ContactsService} from "../contacts/contacts.service";
import {CategoryService} from "../category/category.service";
import {ServicesService} from "../services/services.service";
import {Category} from "../category/repository/category.entity";
import {SubAccountCategoryEnum} from "../../../common/enum/subaccount/subaccount-category.enum";
import {PriceList} from "../price-list/repository/price-list.entity";
import {PriceListService} from "../price-list/price-list.service";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate/index";

@Injectable()
export class SubAccountService {

    constructor(
        @Inject('SUBACCOUNT_REPOSITORY')
        private readonly subAccountRepository: Repository<SubAccount>,
        private readonly contactsService: ContactsService,
        private readonly categoryService: CategoryService,
        private readonly servicesService: ServicesService,
        private readonly priceListService: PriceListService,
    ) {
    }

    async all(): Promise<SubAccount[]> {
        return await this.subAccountRepository.find()
    }

    async paginate(paginationOptions: IPaginationOptions): Promise<Pagination<SubAccount>> {
        return paginate<SubAccount>(this.subAccountRepository, paginationOptions)
    }

    async uploadPriceList(account: Account, file, subAccountId: number): Promise<PriceList> {
        const subAccount = await this.subAccountOfTheOwner(account, subAccountId)

        return await this.priceListService.addPriceList(subAccount, file)
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

    async subAccount(subAccountId: number): Promise<SubAccount> {
        const subAccount = await this.subAccountRepository.findOne(subAccountId)
        if (subAccount === undefined) {
            throw new NotFoundException(`Субаккаунт с id ${subAccountId} не был найден`)
        }
        return subAccount
    }

    async subAccountOfTheOwner(account: Account, subAccountId: number): Promise<SubAccount>{
        const subAccounts = await this.subAccountRepository.find({
            where: {
                account: account
            }
        })

        const subAccount = subAccounts.find(
            subAccount => subAccount.id === subAccountId
        )

        if (subAccount === undefined) {
            throw new BadRequestException(`У аккаунта нет магазина с id ${subAccountId}`)
        }

        return subAccount
    }

    private async getCategory(categoryFromDto: SubAccountCategoryEnum): Promise<Category> {
        const category = await this.categoryService.findByName(categoryFromDto)
        if (category === undefined)
            throw new NotFoundException('Не найдена категория магазина')

        return category
    }
}
