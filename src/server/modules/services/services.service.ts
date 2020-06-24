import {Inject, Injectable} from '@nestjs/common';
import {Services} from "./repository/services.entity";
import {Repository} from "typeorm";
import {CategoryService} from "../category/category.service";

@Injectable()
export class ServicesService {

    constructor(
        @Inject('SERVICES_REPOSITORY')
        private readonly servicesRepository: Repository<Services>,
        private readonly categoryService: CategoryService
    ) {
    }

    async all(): Promise<Services[]> {
        return await this.servicesRepository.find()
    }

    async services(categoryId: number): Promise<Services[]> {
        const category = await this.categoryService.findById(categoryId)
        return await this.servicesRepository.find(
            {where: {category: category}}
        )
    }

    async findByIds(serviceIds: number[]): Promise<Services[]> {
        return await this.servicesRepository.findByIds(serviceIds)
    }

}
