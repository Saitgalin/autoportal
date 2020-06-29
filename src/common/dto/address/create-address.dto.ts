import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAddressDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly city: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly street: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly houseNumber: string
}