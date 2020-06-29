import {IsDate, IsString} from "class-validator";
import {Account} from "../../../server/modules/account/repository/account.entity";

export class CreateAccountTokenDto {
    @IsString()
    jwtToken: string

    account: Account

    @IsDate()
    expiresAt: Date
}