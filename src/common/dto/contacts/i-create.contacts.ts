import {WeekDayEnum} from "../subaccount/weekday.enum";
import {SocialDto} from "../social/social.dto";
import {CreateAddressDto} from "../address/create-address.dto";

export class ICreateContacts {
    readonly address: CreateAddressDto
    readonly phoneNumber: number
    readonly website: string
    readonly workScheduleFrom: WeekDayEnum
    readonly workScheduleTo: WeekDayEnum
    readonly socials: SocialDto

}