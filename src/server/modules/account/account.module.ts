import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { accountProviders } from './repository/account.providers';
import { DatabaseModule } from "../db/database.module";
import { AccountController } from './account.controller';
import {JwtTokenService} from "../jwt-token/jwt-token.service";

@Module({
  imports: [
      DatabaseModule,
  ],
  providers: [
      AccountService,
    ...accountProviders
  ],
  exports: [
      AccountService
  ],
  controllers: [AccountController]
})
export class AccountModule {}
