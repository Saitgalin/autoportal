import {Module} from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {SubaccountRequestService} from './subaccount-request.service';
import {subAccountRequestProviders} from "./repository/subaccount-request.providers";

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...subAccountRequestProviders,
    SubaccountRequestService
  ],
  exports: [
    SubaccountRequestService
  ]
})
export class SubAccountRequestModule {
}
