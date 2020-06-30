import {IsArray, IsEmail, IsNotEmpty, IsObject, IsPhoneNumber, IsString} from "class-validator";
import {ApiBody, ApiConsumes, ApiProperty, ApiQuery} from "@nestjs/swagger";
import {CreateAutopartDto} from "./create-autopart.dto";
import {Transform} from "class-transformer";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {UploadedFile} from "@nestjs/common";

const transformAutoparts = autoparts => {
    if (Array.isArray(autoparts)) {
        return autoparts.map(autopart => ({name: autopart}))
    } else {
        return autoparts;
    }
}

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
    readonly name?: string

    @ApiProperty()
    @IsPhoneNumber('RU')
    readonly phoneNumber?: string

    @ApiProperty()
    @IsEmail()
    readonly email: string

    //TODO: add vin validation
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly vin: string
}