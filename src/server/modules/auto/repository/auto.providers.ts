import {Connection} from "typeorm";
import {Auto} from "./auto.entity";

export const autoProviders = [
    {
        provide: 'AUTO_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Auto),
        inject: ['DATABASE_CONNECTION']
    }
]