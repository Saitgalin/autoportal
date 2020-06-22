import {Connection} from "typeorm";
import {SubAccount} from "./subaccount.entity";

export const subAccountProviders = [
    {
        provide: 'SUBACCOUNT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(SubAccount),
        inject: ['DATABASE_CONNECTION']
    }
]