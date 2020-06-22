import {Controller, Get, Query, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ServicesService} from "./services.service";
import {IReadableServices} from "../../../common/readable/services/IReadableServices";

@ApiTags('services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {
    }

    @Get('/all')
    async all(): Promise<IReadableServices[]> {
        return await this.servicesService.all()
    }

    @Get('/category')
    async services(@Query(new ValidationPipe()) categoryId: number): Promise<IReadableServices[]> {
        return await this.servicesService.services(categoryId)
    }
}
