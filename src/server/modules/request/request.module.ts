import { Module } from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {requestProviders} from "./repository/request.provider";
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {AutoModule} from "../auto/auto.module";
import {MulterModule} from "@nestjs/platform-express";
import {SubAccountModule} from "../subaccount/subaccount.module";
import {ServicesService} from "../services/services.service";
import {ServicesModule} from "../services/services.module";
import {SubAccountRequestModule} from "../subaccount-request/subaccount-request.module";

@Module({
    imports: [
        DatabaseModule,
        AutoModule,
        MulterModule.register({
            dest: './files/requestImages'
        }),
        SubAccountModule,
        ServicesModule,
        SubAccountRequestModule
    ],
    providers: [
        ...requestProviders,
        RequestService
    ],
    controllers: [RequestController]
})
export class RequestModule {}
