import { Module } from '@nestjs/common';
import { AutostoreController } from './autostore.controller';
import { AutostoreService } from './autostore.service';
import {SubAccountModule} from "../subaccount/subaccount.module";
import {ServicesModule} from "../services/services.module";

@Module({
  imports: [
      SubAccountModule,
      ServicesModule
  ],
  controllers: [AutostoreController],
  providers: [AutostoreService]
})
export class AutostoreModule {}
