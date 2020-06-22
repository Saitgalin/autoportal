import {City} from "./city.entity";
import {Connection} from "typeorm";

export const cityProviders = [
    {
        provide: 'CITY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(City),
        inject: ['DATABASE_CONNECTION']
    }
];