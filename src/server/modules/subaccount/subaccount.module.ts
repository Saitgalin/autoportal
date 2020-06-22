import { Module } from '@nestjs/common';
import { SubAccountService } from './subaccount.service';
import { SubAccountController } from './subaccount.controller';
import {DatabaseModule} from "../db/database.module";
import {subAccountProviders} from "./repository/subaccount.providers";

@Module({
  imports: [
      DatabaseModule,
  ],
  providers: [
      SubAccountService,
    ...subAccountProviders
  ],
  controllers: [SubAccountController]
})
export class SubAccountModule {

}
