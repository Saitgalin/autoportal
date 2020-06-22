import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";

export class CreateSubAccountDto {

    @IsNotEmpty()
    @ApiProperty()
    token: string

}