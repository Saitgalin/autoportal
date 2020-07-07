import {Inject, Injectable} from '@nestjs/common';
import {City} from "./repository/city.entity";
import {Repository} from "typeorm";
import {IReadableCity} from "../../../common/readable/city/IReadableCity";

@Injectable()
export class CityService {

    constructor(
        @Inject('CITY_REPOSITORY')
        private readonly cityRepository: Repository<City>
    ) {
    }

    async all(): Promise<IReadableCity[]> {
        return await this.cityRepository.find({
            order: {
                title: "ASC"
            }
        })
    }

    async find(title: string): Promise<City> {
        return await this.cityRepository.findOneOrFail({
            where: {
                title: title
            }
        })
    }


}
