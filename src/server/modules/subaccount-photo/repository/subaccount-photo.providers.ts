import {Connection} from "typeorm";
import {SubAccountPhoto} from "./subaccount-photo.entity";

export const subAccountPhotoProviders = [
    {
        provide: 'SUBACCOUNT_PHOTO_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(SubAccountPhoto),
        inject: ['DATABASE_CONNECTION']
    }
]