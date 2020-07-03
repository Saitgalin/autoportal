import { Module } from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {subAccountPhotoProviders} from "./repository/subaccount-photo.providers";
import { SubAccountPhotoService } from './subaccount-photo.service';
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        DatabaseModule,
        MulterModule.register({
            dest: './files/subAccountFiles'
        })
    ],
    providers: [
        ...subAccountPhotoProviders,
        SubAccountPhotoService
    ],
    exports: [
        SubAccountPhotoService
    ]

})
export class SubaccountPhotoModule {}
