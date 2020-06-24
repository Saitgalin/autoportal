import {Controller, Get, UseGuards} from '@nestjs/common';
import {AccountService} from "./account.service";
import {ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {AuthAccount} from "./decorators/account.decorator";
import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";

@UseGuards(AuthGuard('jwt'))
@ApiTags('account')
@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    @Get('/profile')
    async profile(@AuthAccount() account: Account): Promise<IReadableAccount> {
        return await this.accountService.findById(Number(account.id))
    }
}
