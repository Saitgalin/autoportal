import { Module } from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import { AddressService } from './address.service';
import {CityModule} from "../city/city.module";
import {addressProviders} from "./repository/address.providers";

@Module({
    imports: [
        DatabaseModule,
        CityModule
    ],
    exports: [
        AddressService
    ],
    providers: [
        AddressService,
        ...addressProviders
    ]
})
export class AddressModule {}
