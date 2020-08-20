import {Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe} from '@nestjs/common';
import {AccountService} from "./account.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthAccount} from "./decorators/account.decorator";
import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {EditAccountDto} from "../../../common/dto/auth/edit-account.dto";
import {Account} from "./repository/account.entity";
import {ConfirmSmscodeDto} from "../../../common/dto/auth/confirm-smscode.dto";
import {ConfirmAccountDto} from "../../../common/dto/auth/confirm-account.dto";

@ApiTags('account')
@Controller('account')
@ApiBearerAuth()
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    @UseGuards(AuthenticationGuard)
    @Get('/profile')
    async profile(@AuthAccount() account: Account): Promise<IReadableAccount> {
        return await this.accountService.findById(Number(account.id))
    }

    @UseGuards(AuthenticationGuard)
    @Post('/edit')
    async edit(
        @AuthAccount() account: Account,
        @Body(new ValidationPipe()) editAccountDto: EditAccountDto
    ): Promise<IReadableAccount> {
        return await this.accountService.edit(account, editAccountDto)
    }

    @UseGuards(AuthenticationGuard)
    @Post('/smsCodeConfirm')
    async smsCodeConfirm(
        @AuthAccount() account: Account,
        @Body(new ValidationPipe()) confirmSmsCodeDto: ConfirmSmscodeDto
    ): Promise<void> {
        return await this.accountService.smsCodeConfirm(account, confirmSmsCodeDto.smsCode)
    }

    @UseGuards(AuthenticationGuard)
    @Post('/emailConfirm')
    async emailConfirm(
        @Query(ValidationPipe) confirmAccountDto: ConfirmAccountDto
    ): Promise<boolean> {
        return await this.accountService.emailConfirm(confirmAccountDto.token)
    }


}
