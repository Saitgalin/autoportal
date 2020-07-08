import {Body, Controller, Get, Post, Query, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ServicesService} from "./services.service";
import {IReadableServices} from "../../../common/readable/services/IReadableServices";
import {Services} from "./repository/services.entity";
import {CreateServiceDto} from "../../../common/dto/services/create-service.dto";

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

    @Post('/createService')
    async createService(@Body(new ValidationPipe())createServiceDto: CreateServiceDto): Promise<Services> {
        return await this.servicesService.createService(
            createServiceDto.title,
            createServiceDto.category
        )
    }
}
