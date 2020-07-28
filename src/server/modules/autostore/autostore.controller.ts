import {Body, Controller, Get, Post, Query, UseGuards, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AutostoreService} from "./autostore.service";
import {AutostoreInterface} from "./autostore.interface"
import {EditAutostoreServicesDto} from "../../../common/dto/subaccount/autostore/edit-autostore-services.dto";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {AuthAccount} from "../account/decorators/account.decorator";
import {Account} from "../account/repository/account.entity";
import {SubAccountService} from "../subaccount/subaccount.service";

@ApiBearerAuth()
@ApiTags('autostore')
@Controller('autostore')
export class AutostoreController {

  constructor(
      private readonly autostoreService: AutostoreService,
      private readonly subAccountService: SubAccountService
  ) {
  }

  @Get('/autostore')
  async autostore(@Query('id') autostoreId: number): Promise<AutostoreInterface> {
    return await this.autostoreService.autostore(autostoreId)
  }

  @UseGuards(AuthenticationGuard)
  @Post('/editServices')
  async editServices(
      @AuthAccount() account: Account,
      @Body(new ValidationPipe()) editAutostoreServiceDto: EditAutostoreServicesDto
  ) {
    const subAccount = await this.subAccountService.subAccountOfTheOwner(account, editAutostoreServiceDto.subAccountId)

    return await this.autostoreService.setService(
        editAutostoreServiceDto.title,
        editAutostoreServiceDto.type,
        subAccount
    )
  }

}
