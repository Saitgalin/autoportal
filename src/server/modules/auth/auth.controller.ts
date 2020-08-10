import {
    Body,
    Controller,
    Get,
    InternalServerErrorException, Logger, Param,
    Post,
    Query,
    Req,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";
import {SignInDto} from "../../../common/dto/auth/sign-in.dto";
import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";
import {ConfirmAccountDto} from "../../../common/dto/auth/confirm-account.dto";
import {AuthGuard} from "@nestjs/passport";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {AuthAccount} from "../account/decorators/account.decorator";
import {Account} from "../account/repository/account.entity";
import {ConfirmSmscodeDto} from "../../../common/dto/auth/confirm-smscode.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/signUp')
    async signUp(@Body(ValidationPipe) createUserDto: CreateAccountDto): Promise<boolean> {
        return await this.authService.signUp(createUserDto)
    }

    @Get('/confirm')
    async emailConfirm(@Query(ValidationPipe) query: ConfirmAccountDto): Promise<any> {
        return await this.authService.emailConfirm(query.token)
    }

    @Post('/signIn')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableAccount> {
        return await this.authService.signIn(signInDto)
    }

    @Post('/smsTest')
    async smsTest(): Promise<Boolean> {
        return await this.authService.smsTest()
    }

    @ApiBearerAuth()
    @UseGuards(AuthenticationGuard)
    @Post("/smsCodeConfirm")
    async smsCodeConfirm(
        @AuthAccount() account: Account,
        @Body(new ValidationPipe()) confirmSmsCodeDto: ConfirmSmscodeDto
    ): Promise<boolean> {
        return await this.authService.smsCodeConfirm(account, Number(confirmSmsCodeDto.smsCode))
    }

    @ApiBearerAuth()
    @UseGuards(AuthenticationGuard)
    @Post("/confirmRules")
    async confirmRules(
        @AuthAccount() account: Account
    ): Promise<boolean> {
        return await this.authService.rulesConfirm(account)
    }

    @Get('/getIp')
    async getIp(@Req() req) {
        return this.authService.getIp(req)
    }

    @Get('getCityByIp')
    async getCityByIp(@Req() req) {
        const ip = this.authService.getIp(req)
        const response = await this.authService.cityByIp(ip)
        const location = response.data.location
        if (location === null || location === undefined || location.data === undefined)
            throw new InternalServerErrorException('Не был определен город по IP')

        return location.data.city
    }

    //TODO: impl this
    @Post('/forgotPassword')
    async forgotPassword(@Body() email: string): Promise<any> {
        return 'impl this plz'
    }
}
