import { Module } from '@nestjs/common';
import {autoProviders} from "./repository/auto.providers";
import { AutoController } from './auto.controller';
import { AutoService } from './auto.service';
import {DatabaseModule} from "../db/database.module";

@Module({
    imports: [
        DatabaseModule
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
