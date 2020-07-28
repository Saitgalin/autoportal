import {IsEmail, IsNotEmpty, IsNumberString, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateAutopartDto} from "./create-autopart.dto";

export class CreateRequestDto {

    @ApiProperty({ type: () => [CreateAutopartDto]} )
    readonly autoparts: CreateAutopartDto[]

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly autoMake: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly autoModel: string

    @ApiProperty()
    @IsString()
    readonly name: string

    @ApiProperty()
    @IsNumberString()
    readonly phoneNumber: string

    @ApiProperty()
    @IsEmail()
    readonly email: string

    //TODO: add vin validation
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly vin: string
}
