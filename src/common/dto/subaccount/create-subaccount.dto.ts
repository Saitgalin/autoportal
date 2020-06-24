import {IsEnum, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";
import {SubAccountCategoryEnum} from "../../enum/subaccount/subaccount-category.enum";
import {WeekDayEnum} from "./weekday.enum";
import {SocialDto} from "../social/social.dto";
import {CreateAddressDto} from "../address/create-address.dto";

export class CreateSubAccountDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsString()
    readonly description: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(SubAccountCategoryEnum)
    readonly category: SubAccountCategoryEnum

    @IsString()
    @IsNotEmpty()
    readonly services: number[]

    readonly address: CreateAddressDto

    @IsPhoneNumber('RU')
    readonly phoneNumber: number

    @IsString()
    readonly website: string

    @IsNotEmpty()
    @IsEnum(WeekDayEnum)
    readonly workScheduleFrom: WeekDayEnum

    @IsNotEmpty()
    @IsEnum(WeekDayEnum)
    readonly workScheduleTo: WeekDayEnum

    readonly socials: SocialDto



}