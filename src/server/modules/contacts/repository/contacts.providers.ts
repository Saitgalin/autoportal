import {Connection} from "typeorm";
import {Contacts} from "./contacts.entity";

export const contactsProviders = [
    {
        provide: 'CONTACTS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Contacts),
        inject: ['DATABASE_CONNECTION']
    }
]