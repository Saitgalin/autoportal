import { Module } from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {requestProviders} from "./repository/request.provider";
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {AutoModule} from "../auto/auto.module";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        DatabaseModule,
        AutoModule,
        MulterModule.register({
            dest: './files/requestImages'
        })
    ],
    providers: [
        ...requestProviders,
        RequestService
    ],
    controllers: [RequestController]
})
export class RequestModule {}
