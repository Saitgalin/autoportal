import {IsArray, IsEnum, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";
import {SubAccountCategoryEnum} from "../../enum/subaccount/subaccount-category.enum";
import {WeekDayEnum} from "./weekday.enum";
import {SocialDto} from "../social/social.dto";
import {CreateAddressDto} from "../address/create-address.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSubAccountDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty()
    @IsString()
    readonly description: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(SubAccountCategoryEnum)
    readonly category: SubAccountCategoryEnum

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    readonly services: number[]

    @ApiProperty({ type: () => [CreateAddressDto] })
    readonly address: CreateAddressDto[]

    @ApiProperty()
    @IsPhoneNumber('RU')
    readonly phoneNumber: string

    @ApiProperty()
    @IsString()
    readonly website: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(WeekDayEnum)
    readonly workScheduleFrom: WeekDayEnum

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(WeekDayEnum)
    readonly workScheduleTo: WeekDayEnum

    @ApiProperty()
    readonly socials: SocialDto

}