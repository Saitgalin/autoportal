import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {SubAccountService} from "./subaccount.service";
import {CreateSubAccountDto} from "../../../common/dto/subaccount/create-subaccount.dto";
import {AuthAccount} from "../account/decorators/account.decorator";
import {Account} from "../account/repository/account.entity";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {SubAccount} from "./repository/subaccount.entity";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {SubAccountFileUploadDto} from "../../../common/dto/subaccount/subaccount-file-upload.dto";
import {SubAccountPhoto} from "../subaccount-photo/repository/subaccount-photo.entity";

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

    @UseGuards(AuthenticationGuard)
    @Post('/loadPhoto')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Загрузить фотографию магазина',
        type: SubAccountFileUploadDto,
    })
    async loadPhoto(
        @AuthAccount() account: Account,
        @UploadedFile() file,
        @Body() request
    ): Promise<SubAccountPhoto> {
        return this.subAccountService.uploadPhoto(
            account, file, parseInt(request.subAccountId)
        )
    }

    @Get('/all')
    async all() {
        return await this.subAccountService.all()
    }

    @Get('/byCity')
    async byCity(@Query('city') city: string) {
        return await this.subAccountService.findByCities(city)
    }


}
