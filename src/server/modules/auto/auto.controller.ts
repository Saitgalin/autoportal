import {Controller, Get, Inject} from '@nestjs/common';
import {Repository} from "typeorm";
import {Auto} from "./repository/auto.entity";
import {AutoService} from "./auto.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('auto')
@Controller('auto')
export class AutoController {

    constructor(
        private readonly autoService: AutoService
    ) {
    }

    @Get()
    async all(): Promise<Auto[]> {
        return await this.autoService.all()
    }
}
