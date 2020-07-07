import {Module} from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {ContactsService} from './contacts.service';
import {AddressModule} from "../address/address.module";
import {contactsProviders} from "./repository/contacts.providers";
import {SocialModule} from "../social/social.module";

@Module({
    imports: [
        DatabaseModule,
        AddressModule,
        SocialModule
    ],
    exports: [
        ContactsService
    ],
    providers: [
        ContactsService,
        ...contactsProviders
    ]
})
export class ContactsModule {}
