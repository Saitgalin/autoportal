import {WeekDayEnum} from "../../dto/subaccount/weekday.enum";
import {SocialDto} from "../../dto/social/social.dto";
import {CreateAddressDto} from "../../dto/address/create-address.dto";

export class IReadableCreateContacts {
    readonly address: CreateAddressDto[]
    readonly phoneNumber: string
    readonly website: string
    readonly workScheduleFrom: WeekDayEnum
    readonly workScheduleTo: WeekDayEnum
    readonly socials: SocialDto

}