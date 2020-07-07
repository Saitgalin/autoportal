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
import {SubAccountPhoto} from "../subaccount-photo/repository/subaccount-photo.entity";
import {LoadPriceListDto} from "../../../common/dto/subaccount/load-price-list.dto";
import {Pagination} from "nestjs-typeorm-paginate/index";
import {ConfigService} from "@nestjs/config";


@ApiTags('subAccount')
@ApiBearerAuth()
@Controller('subAccount')
export class SubAccountController {
    private readonly clientAppUrl: string

    constructor(
        private readonly subAccountService: SubAccountService,
        private readonly configService: ConfigService,
    ) {
        this.clientAppUrl = configService.get<string>('CLIENT_APP_URL')
    }

    @UseGuards(AuthenticationGuard)
    @Post('/create')
    async create(
        @AuthAccount() account: Account,
        @Body(new ValidationPipe()) createSubAccountDto: CreateSubAccountDto
    ): Promise<SubAccount> {
        return await this.subAccountService.create(account, createSubAccountDto)
    }

    @Get('/all')
    async all() {
        return await this.subAccountService.all()
    }

    @Get('')
    async index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<Pagination<SubAccount>> {
        limit = limit > 100 ? 100 : limit
        return this.subAccountService.paginate({
            page,
            limit,
            route: `${this.clientAppUrl}/subAccount`
        })
    }

    @Get('/byCity')
    async byCity(@Query('city') city: string) {
        return await this.subAccountService.findByCities(city)
    }



    @UseGuards(AuthenticationGuard)
    @Post('/loadPriceList')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Загрузить прайс-лист магазина',
        type: LoadPriceListDto,
    })
    async loadPriceList(
        @AuthAccount() account: Account,
        @UploadedFile() file,
        @Body() request
    ): Promise<SubAccountPhoto> {
        return this.subAccountService.uploadPriceList(
            account, file, parseInt(request.subAccountId)
        )
    }


}
