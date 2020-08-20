import {forwardRef, Global, Module} from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {JwtTokenService} from './jwt-token.service';
import {tokenProviders} from "./repository/token.providers";
import {AccountModule} from "../account/account.module";
import {AuthModule} from "../auth/auth.module";
import {AccountService} from "../account/account.service";

@Global()
@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => AccountModule),
        forwardRef(() => AuthModule)
    ],
    providers: [
        ...tokenProviders,
        JwtTokenService
    ],
    exports: [
        JwtTokenService
    ]
})
export class JwtTokenModule {}
