import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateAccountDto} from "../../common/dto/auth/create-account.dto";
import {SignInDto} from "../../common/dto/auth/sign-in.dto";
import {IReadableAccount} from "../../common/readable/account/IReadableAccount";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/signUp')
    async signUp(@Body(new ValidationPipe()) createUserDto: CreateAccountDto): Promise<boolean> {
        return this.authService.signUp(createUserDto)
    }

    @Post('/signIn')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableAccount> {
        return await this.authService.signIn(signInDto)
    }
}
