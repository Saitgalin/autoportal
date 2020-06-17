import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { accountProviders } from './repository/account.providers';
import { DatabaseModule } from "../db/database.module";
import { AccountController } from './account.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
      AccountService,
    ...accountProviders
  ],
  controllers: [AccountController],
  exports: [
      AccountService
  ]
})
export class AccountModule {}
