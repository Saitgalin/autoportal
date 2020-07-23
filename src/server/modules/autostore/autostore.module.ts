import { Module } from '@nestjs/common';
import { AutostoreController } from './autostore.controller';
import { AutostoreService } from './autostore.service';
import {SubAccountModule} from "../subaccount/subaccount.module";

@Module({
  imports: [SubAccountModule],
  controllers: [AutostoreController],
  providers: [AutostoreService]
})
export class AutostoreModule {}
