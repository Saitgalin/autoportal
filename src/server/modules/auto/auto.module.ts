import { Module } from '@nestjs/common';
import {autoProviders} from "./repository/auto.providers";
import { AutoController } from './auto.controller';
import { AutoService } from './auto.service';
import {DatabaseModule} from "../db/database.module";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        DatabaseModule,
        MulterModule.register({
            dest: './files/autoIcons'
        }),
    ],
    providers: [
        ...autoProviders,
        AutoService
    ],
    controllers: [AutoController],
    exports: [
        AutoService
    ]
})
export class AutoModule {}
