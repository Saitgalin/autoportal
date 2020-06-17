import { Module } from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import { JwtTokenService } from './jwt-token.service';
import {tokenProviders} from "./repository/token.providers";

@Module({
    imports: [DatabaseModule],
    providers: [JwtTokenService, ...tokenProviders],
    exports: [JwtTokenService]
})
export class JwtTokenModule {}
