import {Connection} from "typeorm";
import {Request} from "./request.entity";

export const requestProviders = [
    {
        provide: 'REQUEST_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Request),
        inject: ['DATABASE_CONNECTION']
    }
]