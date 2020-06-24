import { Module } from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import { SocialService } from './social.service';
import {socialProviders} from "./repository/social.providers";

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [SocialService, ...socialProviders],
    exports: [
        SocialService
    ]
})
export class SocialModule {}
