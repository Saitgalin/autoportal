import {forwardRef, Global, Module} from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import { JwtTokenService } from './jwt-token.service';
import {tokenProviders} from "./repository/token.providers";
import {AccountModule} from "../account/account.module";
import {AuthenticationGuard} from "./authorization.guard";

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => AccountModule)
    ],
    providers: [
        ...tokenProviders,
        JwtTokenService,
        AuthenticationGuard
    ],
    exports: [
        JwtTokenService,
        AuthenticationGuard
    ]
})
export class JwtTokenModule {}
