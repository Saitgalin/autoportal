import {forwardRef, Module} from '@nestjs/common';
import {AccountService} from './account.service';
import {accountProviders} from './repository/account.providers';
import {DatabaseModule} from "../db/database.module";
import {AccountController} from './account.controller';
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {AuthModule} from "../auth/auth.module";
import {JwtTokenModule} from "../jwt-token/jwt-token.module";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => JwtTokenModule),
    forwardRef(() => AuthModule)
  ],
  providers: [
    AccountService,
    ...accountProviders,
    AuthenticationGuard
  ],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule {
}
