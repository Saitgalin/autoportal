import {IsDate, IsString} from "class-validator";
import {Account} from "../../../server/account/repository/account.entity";

export class CreateAccountTokenDto {
    @IsString()
    token: string

    account: Account

    @IsDate()
    expiresAt: Date
}