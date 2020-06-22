import {Controller, Post, UseGuards} from '@nestjs/common';
import {SubAccountService} from "./subaccount.service";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {AuthGuard} from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('subAccount')
export class SubAccountController {

    constructor(private readonly subAccountService: SubAccountService) {
    }

    @Post()
    async create(createSubAccountDto: CreateSubAccountDto) {
        //TODO:
    }
}
