import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import {DatabaseModule} from "../db/database.module";
import {servicesProviders} from "./repository/services.providers";
import { ServicesController } from './services.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
      ServicesService,
    ...servicesProviders
  ],
  controllers: [ServicesController]
})
export class ServicesModule {

}
