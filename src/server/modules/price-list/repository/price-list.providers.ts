import {Connection} from "typeorm";
import {PriceList} from "./price-list.entity";

export const priceListProviders = [
    {
        provide: 'PRICE_LIST_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PriceList),
        inject: ['DATABASE_CONNECTION']
    }
]