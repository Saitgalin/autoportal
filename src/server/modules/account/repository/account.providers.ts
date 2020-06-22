import {AccountRepository} from "./account.repository";
import {Connection} from "typeorm";

export const accountProviders = [
        {
            provide: 'ACCOUNT_REPOSITORY',
            useFactory: (connection: Connection) => connection.getCustomRepository(AccountRepository),
            inject: ['DATABASE_CONNECTION']
        }
    ]
