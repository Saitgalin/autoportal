import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import {DatabaseModule} from "../db/database.module";
import {priceListProviders} from "./repository/price-list.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
      PriceListService,
      ...priceListProviders
  ],
  exports: [
      PriceListService
  ]
})
export class PriceListModule {}
