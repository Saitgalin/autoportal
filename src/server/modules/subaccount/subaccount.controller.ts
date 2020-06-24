import {Controller, Post, UseGuards} from '@nestjs/common';
import {SubAccountService} from "./subaccount.service";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {AuthGuard} from "@nestjs/passport";
import {AuthAccount} from "../account/decorators/account.decorator";
import {Account} from "../account/repository/account.entity";
import {ApiTags} from "@nestjs/swagger";

@UseGuards(AuthGuard('jwt'))
@ApiTags('subAccount')
@Controller('subAccount')
export class SubAccountController {

    constructor(private readonly subAccountService: SubAccountService) {
    }

    @Post()
    async create(@AuthAccount() account: Account, createSubAccountDto: CreateSubAccountDto) {
        await this.subAccountService.create(account, createSubAccountDto)
    }
}
