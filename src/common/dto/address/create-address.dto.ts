import {IsNotEmpty, IsString} from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    readonly city: string

    @IsString()
    @IsNotEmpty()
    readonly street: string

    @IsString()
    @IsNotEmpty()
    readonly houseNumber: string
}