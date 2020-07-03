import {Controller, Get, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {IReadableCity} from "../../../common/readable/city/IReadableCity";
import {CityService} from "./city.service";

@ApiTags('city')
@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService) {}

    @Get('/all')
    async all(): Promise<IReadableCity[]> {
        return this.cityService.all()
    }
}
