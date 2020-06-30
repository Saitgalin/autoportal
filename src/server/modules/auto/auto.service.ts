import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Auto} from "./repository/auto.entity";

@Injectable()
export class AutoService {
    constructor(
        @Inject('AUTO_REPOSITORY')
        private readonly autoRepository: Repository<Auto>) {
    }

    async all(): Promise<Auto[]> {
        return await this.autoRepository.find()
    }

    async findByMakeModel(make: string, model: string): Promise<Auto> {
        return await this.autoRepository.findOne({
            where: {
                model: model,
                make: make
            }
        })
    }
}
