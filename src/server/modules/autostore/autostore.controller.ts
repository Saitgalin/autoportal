import {Controller, Get, Query, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AutostoreService} from "./autostore.service";
import {AutostoreInterface} from "./autostore.interface"

@ApiTags('autostore')
@Controller('autostore')
export class AutostoreController {

  constructor(private readonly autostoreService: AutostoreService) {
  }

  @Get('/autostore')
  async autostore(@Query('id') autostoreId: number): Promise<AutostoreInterface> {
    return await this.autostoreService.autostore(autostoreId)
  }

}
