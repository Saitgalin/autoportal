import {Connection} from "typeorm";
import {AccountRepository} from "./account.repository";

export const accountProviders = [
        {
            provide: 'ACCOUNT_REPOSITORY',
            useFactory: (connection: Connection) => connection.getCustomRepository(AccountRepository),
            inject: ['DATABASE_CONNECTION']
        }
    ]
