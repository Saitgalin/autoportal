import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import {DatabaseModule} from "../db/database.module";
import {servicesProviders} from "./repository/services.providers";
import { ServicesController } from './services.controller';
import {CategoryModule} from "../category/category.module";

@Module({
  imports: [DatabaseModule, CategoryModule],
  providers: [
      ServicesService,
    ...servicesProviders
  ],
  controllers: [ServicesController],
  exports: [ServicesService]
})
export class ServicesModule {

}
