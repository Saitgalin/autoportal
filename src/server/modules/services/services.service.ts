import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {Services} from "./repository/services.entity";
import {Repository} from "typeorm";
import {CategoryService} from "../category/category.service";
import {SubAccountCategoryEnum} from "../../../common/enum/subaccount/subaccount-category.enum";
import {CreateServiceDto} from "../../../common/dto/services/create-service.dto";
import {AutoTypeEnum} from "../../../common/enum/auto/auto-type.enum";

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

  async findByTitleAndAutoType(serviceTitle: string, autoType: AutoTypeEnum): Promise<Services> {
    const service = await this.servicesRepository.findOne(
        {
          where: {
            title: serviceTitle,
            autoType: autoType
          }
        }
    )

    if (service == null) {
      throw new BadRequestException('Не была найдена услуга/автомобиль')
    }

    return service
  }

  async findByCategoryTitle(categoryTitle: SubAccountCategoryEnum): Promise<Services[]> {
    const category = await this.categoryService.findByName(categoryTitle)
    return await this.servicesRepository.find(
        {where: {category: category}}
    )
  }

  async findByIds(serviceIds: number[]): Promise<Services[]> {
    return await this.servicesRepository.findByIds(serviceIds)
  }

  async findByMakeAndType(make: string, type: AutoTypeEnum): Promise<Services> {
    const service = await this.servicesRepository.findOne(
        {
          where: {
            title: make,
            autoType: type
          }
        }
    )

    if (service == null) {
      throw new BadRequestException('Не был найден автомобиль в услугах')
    }

    return service
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Services> {
    const service = new Services()
    if (createServiceDto.category === SubAccountCategoryEnum.saleAutoParts) {
      if (createServiceDto.type == null) {
        throw new BadRequestException("Не указан тип автомобиля (легковой или грузовой)")
      }
      service.autoType = createServiceDto.type
    }

    service.category = await this.categoryService.findByName(createServiceDto.category)
    service.title = createServiceDto.title

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
