import {Services} from "./services.entity";
import {Connection} from "typeorm";

export const servicesProviders = [
    {
        provide: 'SERVICES_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Services),
        inject: ['DATABASE_CONNECTION']
    }
]