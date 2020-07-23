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

    async uploadAutoIcon(file: any, autoTitle: string): Promise<Auto[]> {
        const autos: Auto[] = await this.findAutoByTitle(autoTitle)
        for (const auto of autos) {
            auto.imagePath = file.filename
            await this.autoRepository.save(auto)
        }
        return autos;
    }

    async getAutoIcon(autoTitle: string, res: Response): Promise<void> {
        const auto = await this.findAutoByTitle(autoTitle)
        const imagePath = path.resolve(`./files/autoIcons/${auto[0].imagePath}`)
        res.sendFile(imagePath)
    }

    private async findAutoByTitle(auto: string): Promise<Auto[]> {
        const findedAuto = await this.autoRepository.find({make: auto})
        if (auto === undefined) {
            throw new NotFoundException(`Не был найден автомобиль ${auto}`)
        }

        return findedAuto
    }
    //TODO: подобные методы лучше перенести в репозиторий
    private async findAutoById(autoId: number): Promise<Auto> {
        const auto = await this.autoRepository.findOne(autoId)
        if (auto === undefined) {
            throw new NotFoundException(`Не был найден автомобиль с id ${autoId}`)
        }

        return auto
    }
}
