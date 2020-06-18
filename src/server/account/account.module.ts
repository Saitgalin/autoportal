import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { accountProviders } from './repository/account.providers';
import { DatabaseModule } from "../db/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [
      AccountService,
    ...accountProviders
  ],
  exports: [
      AccountService
  ]
})
export class AccountModule {}
