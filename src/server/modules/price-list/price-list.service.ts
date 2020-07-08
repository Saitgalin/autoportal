import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {PriceList} from "./repository/price-list.entity";
import {SubAccount} from "../subaccount/repository/subaccount.entity";

@Injectable()
export class PriceListService {

    constructor(
        @Inject('PRICE_LIST_REPOSITORY')
        private readonly priceListRepository: Repository<PriceList>
    ) {
    }

    async addPriceList(subAccount: SubAccount, file: any): Promise<PriceList> {
        const priceList = new PriceList()
        priceList.subAccount = subAccount
        priceList.path = file.filename
        return await this.priceListRepository.save(priceList)
    }
}
