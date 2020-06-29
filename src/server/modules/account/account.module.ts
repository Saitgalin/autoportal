import {forwardRef, Module} from '@nestjs/common';
import { AccountService } from './account.service';
import { accountProviders } from './repository/account.providers';
import { DatabaseModule } from "../db/database.module";
import { AccountController } from './account.controller';
import {JwtTokenService} from "../jwt-token/jwt-token.service";
import {JwtTokenModule} from "../jwt-token/jwt-token.module";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";

@Module({
  imports: [
      DatabaseModule,
      forwardRef(() => JwtTokenModule)
  ],
  providers: [
      AccountService,
    ...accountProviders,
      AuthenticationGuard
  ],
  exports: [
      AccountService
  ],
  controllers: [AccountController]
})
export class AccountModule {}
