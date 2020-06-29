import {Controller, Get, UseGuards} from '@nestjs/common';
import {AccountService} from "./account.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthAccount} from "./decorators/account.decorator";
import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";

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
}
