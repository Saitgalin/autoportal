import {
    Body,
    Controller,
    Get,
    Post,
    Query, Res,
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
import {Pagination} from "nestjs-typeorm-paginate";
import {ConfigService} from "@nestjs/config";
import {FilterSubAccountDto} from "../../../common/dto/subaccount/filter-subaccount-byservices.dto";
import {GetPriceListDto} from "../../../common/dto/subaccount/get-price-list.dto";
import {EditSubAccountDescriptionDto} from "../../../common/dto/subaccount/edit/edit-description.dto";


@ApiTags('subAccount')
@ApiBearerAuth()
@Controller('subAccount')
export class SubAccountController {
    private readonly clientAppUrl: string

    constructor(
        private readonly subAccountService: SubAccountService,
        private readonly configService: ConfigService
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
    async all(): Promise<SubAccount[]> {
        return await this.subAccountService.all()
    }

    @Get('/selectWithQuery')
    async selectWithQuery(
        @Query(new ValidationPipe({ transform: true })) filter: FilterSubAccountDto
    ): Promise<Pagination<SubAccount>> {
        return await this.subAccountService.paginateSearch(
            filter.subAccountCategory,
            filter.conditions, filter.services,
            {
            page: Number(filter.page),
            limit: Number(filter.limit),
            route: `${this.clientAppUrl}/subAccount`
        })
    }

    @Get('')
    async index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 12
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

    @Get('/getPriceList')
    async getPriceList(
        @Query(new ValidationPipe()) getPriceListDto: GetPriceListDto,
        @Res() response
    ) {
        return await this.subAccountService.priceList(getPriceListDto.subAccountId, response)
    }

    @UseGuards(AuthenticationGuard)
    @Post('/editSubAccountDescription')
    async editSubAccountDescription(
        @AuthAccount() account: Account,
        @Body(new ValidationPipe()) editSubAccountDescriptionDto: EditSubAccountDescriptionDto
    ) {
        return await this.subAccountService.editSubAccountDescription(
            account,
            editSubAccountDescriptionDto.description,
            Number(editSubAccountDescriptionDto.subAccountId)
        )
    }

    @UseGuards(AuthenticationGuard)
    @Post('/loadPriceList')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Загрузить прайс-лист магазина',
        type: LoadPriceListDto
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
