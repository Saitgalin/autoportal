import {Module} from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {subAccountPhotoProviders} from "./repository/subaccount-photo.providers";
import {SubAccountPhotoService} from './subaccount-photo.service';
import {MulterModule} from "@nestjs/platform-express";
import {SubaccountPhotoController} from './subaccount-photo.controller';
import {SubAccountService} from "../subaccount/subaccount.service";
import {SubAccountModule} from "../subaccount/subaccount.module";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: './files/subAccountFiles'
    }),
    SubAccountModule
  ],
  providers: [
    ...subAccountPhotoProviders,
    SubAccountPhotoService,
      AuthenticationGuard
  ],
  exports: [
    SubAccountPhotoService
  ],
  controllers: [
    SubaccountPhotoController
  ]

})
export class SubAccountPhotoModule {}
