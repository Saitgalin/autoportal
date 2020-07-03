import { Module } from '@nestjs/common';
import { SubAccountService } from './subaccount.service';
import { SubAccountController } from './subaccount.controller';
import {DatabaseModule} from "../db/database.module";
import {subAccountProviders} from "./repository/subaccount.providers";
import {ContactsModule} from "../contacts/contacts.module";
import {CategoryService} from "../category/category.service";
import {CategoryModule} from "../category/category.module";
import {ServicesModule} from "../services/services.module";
import {AccountModule} from "../account/account.module";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {JwtTokenModule} from "../jwt-token/jwt-token.module";
import {SubaccountPhotoModule} from "../subaccount-photo/subaccount-photo.module";
import {MulterModule} from "@nestjs/platform-express";
import {PriceListModule} from "../price-list/price-list.module";

@Module({
  imports: [
      DatabaseModule,
      ContactsModule,
      CategoryModule,
      ServicesModule,
      AccountModule,
      JwtTokenModule,
      SubaccountPhotoModule,
      MulterModule.register({
          dest: './files/subAccountFiles'
      }),
      MulterModule,
      PriceListModule
  ],
  providers: [
      SubAccountService,
    ...subAccountProviders,
      AuthenticationGuard
  ],
  controllers: [SubAccountController]
})
export class SubAccountModule {

}
