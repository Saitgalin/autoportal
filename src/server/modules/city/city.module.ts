import {HttpModule, Module} from '@nestjs/common';
import { CityService } from './city.service';
import {DatabaseModule} from "../db/database.module";
import {cityProviders} from "./repository/city.providers";
import { CityController } from './city.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
      CityService,
      ...cityProviders
  ],
  exports: [
     CityService
  ],
  controllers: [CityController],
})
export class CityModule {}
