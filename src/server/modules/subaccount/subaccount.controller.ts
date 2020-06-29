import {Body, Controller, Delete, Logger, Post, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {SubAccountService} from "./subaccount.service";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {AuthAccount} from "../account/decorators/account.decorator";
import {Account} from "../account/repository/account.entity";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {SubAccount} from "./repository/subaccount.entity";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";

@ApiTags('subAccount')
@ApiBearerAuth()
@Controller('subAccount')
export class SubAccountController {

    constructor(private readonly subAccountService: SubAccountService) {
    }

    @UseGuards(AuthenticationGuard)
    @Post('/create')
    async create(
        @AuthAccount() account: Account,
        @Body(new ValidationPipe()) createSubAccountDto: CreateSubAccountDto
    ): Promise<SubAccount> {
        return await this.subAccountService.create(account, createSubAccountDto)
    }

}
