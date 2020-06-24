import {Connection} from "typeorm";
import {Social} from "./social.entity";

export const socialProviders = [
    {
        provide: 'SOCIAL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Social),
        inject: ['DATABASE_CONNECTION']
    }
]