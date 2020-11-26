import {Body, Controller, Get, Post, Query, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ServicesService} from "./services.service";
import {IReadableServices} from "../../../common/readable/services/IReadableServices";
import {Services} from "./repository/services.entity";
import {CreateServiceDto} from "../../../common/dto/services/create-service.dto";
import {FindByCategoriesDto} from "../../../common/dto/services/find-by-categories.dto";
import {SubAccountCategoryEnum} from "../../../common/enum/subaccount/subaccount-category.enum";

@ApiTags('services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {
    }

    @Get('/all')
    async all(): Promise<IReadableServices[]> {
        return await this.servicesService.all()
    }

    @Get('/findByCategory')
    async services (
        @Query(new ValidationPipe({ transform: true }))
            findByCategoriesDto: FindByCategoriesDto
    ): Promise<IReadableServices[]> {
        return await this.servicesService.findByCategoryTitle(findByCategoriesDto.categoryTitle)
    }

    @Get('/autoServices')
    async autoServices(): Promise<IReadableServices[]> {
        return await this.servicesService.findByCategoryTitle(SubAccountCategoryEnum.service)
    }

    @Get('/truckCars')
    async truckCars(): Promise<IReadableServices[]> {
        return await this.servicesService.trucks()
    }

    @Get('/passengerCars')
    async passengerCars(): Promise<IReadableServices[]> {
        return await this.servicesService.passengers()
    }

    @Post('/createService')
    async createService(@Body(new ValidationPipe()) createServiceDto: CreateServiceDto): Promise<Services> {
        return await this.servicesService.createService(
            createServiceDto
        )
    }
}
