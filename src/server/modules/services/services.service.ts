import {Inject, Injectable} from '@nestjs/common';
import {Services} from "./repository/services.entity";
import {Repository} from "typeorm";
import {CategoryService} from "../category/category.service";
import {SubAccountCategoryEnum} from "../../../common/enum/subaccount/subaccount-category.enum";

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

    async createService(title: string, category: SubAccountCategoryEnum): Promise<Services> {
        const service = new Services()
        service.category = await this.categoryService.findByName(category)
        service.title = title

        return await this.servicesRepository.save(service)
    }

    async transformServiceTitlesToServices(serviceTitles: Array<string>) {
        const services = []
        for (const service of serviceTitles) {
            if (service === "") {
                continue
            }
            const findedService = await this.servicesRepository.findOne({title: service})
            services.push(findedService)
        }

        return services
    }

}
