import {Module} from '@nestjs/common';
import {SubAccountService} from './subaccount.service';
import {SubAccountController} from './subaccount.controller';
import {DatabaseModule} from "../db/database.module";
import {subAccountProviders} from "./repository/subaccount.providers";
import {ContactsModule} from "../contacts/contacts.module";
import {CategoryModule} from "../category/category.module";
import {ServicesModule} from "../services/services.module";
import {AccountModule} from "../account/account.module";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {JwtTokenModule} from "../jwt-token/jwt-token.module";
import {MulterModule} from "@nestjs/platform-express";
import {PriceListModule} from "../price-list/price-list.module";
import {configModule} from "../../configure.root";

@Module({
  imports: [
    DatabaseModule,
    ContactsModule,
    CategoryModule,
    ServicesModule,
    AccountModule,
    JwtTokenModule,
    MulterModule.register({
      dest: './files/subAccountFiles'
    }),
    PriceListModule,
    configModule,
  ],
  providers: [
    SubAccountService,
    ...subAccountProviders
  ],
  controllers: [SubAccountController],
  exports: [
      SubAccountService
  ]
})
export class SubAccountModule {}
