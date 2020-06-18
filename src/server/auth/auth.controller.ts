import {Body, Controller, Get, Post, Query, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateAccountDto} from "../../common/dto/auth/create-account.dto";
import {SignInDto} from "../../common/dto/auth/sign-in.dto";
import {IReadableAccount} from "../../common/readable/account/IReadableAccount";
import {ConfirmAccountDto} from "../../common/dto/auth/confirm-account.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/signUp')
    async signUp(@Body(new ValidationPipe()) createUserDto: CreateAccountDto): Promise<boolean> {
        return await this.authService.signUp(createUserDto)
    }

    @Get('/confirm')
    async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<any> {
        return await this.authService.emailConfirm(query.token)
    }

    @Post('/signIn')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableAccount> {
        return await this.authService.signIn(signInDto)
    }
}
