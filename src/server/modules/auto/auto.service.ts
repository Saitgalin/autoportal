import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {Auto} from "./repository/auto.entity";
import {Response} from "express";
import * as path from "path";

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

    async uploadAutoIcon(file: any, autoId: number): Promise<Auto> {
        const auto = await this.findAuto(autoId)

        auto.imagePath = file.filename
        return await this.autoRepository.save(auto)
    }

    async getAutoIcon(autoId: number, res: Response): Promise<void> {
        const auto = await this.findAuto(autoId)
        const imagePath = path.resolve(`./files/autoIcons/${auto.imagePath}`)
        res.sendFile(imagePath)
    }

    //TODO: подобные методы лучше перенести в репозиторий
    private async findAuto(autoId: number): Promise<Auto> {
        const auto = await this.autoRepository.findOne(autoId)
        if (auto === undefined) {
            throw new NotFoundException(`Не был найден автомобиль с id ${autoId}`)
        }

        return auto
    }
}
