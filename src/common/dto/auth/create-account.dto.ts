import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches} from "class-validator";

export class CreateAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly fio: string

    @ApiProperty()
    @IsPhoneNumber('RU')
    @IsNotEmpty()
    readonly phone: string

    @ApiProperty()
    @IsEmail()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'Weak password' },
    )
    @ApiProperty()
    readonly password: string
}