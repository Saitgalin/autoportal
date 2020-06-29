import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";
import {Address} from "../../address/repository/address.entity";
import {Social} from "../../social/repository/social.entity";
import {WeekDayEnum} from "../../../../common/dto/subaccount/weekday.enum";

@Entity()
export class Contacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true, type: "bigint"})
    phoneNumber?: number

    @Column({nullable: true})
    website?: string

    @OneToOne(type => SubAccount, subaccount => subaccount.contacts)
    subAccount: SubAccount

    @OneToMany(type => Address, address => address.contacts, {cascade: true})
    addresses: Address[]

    @OneToOne(type => Social, social => social.contacts, {cascade: true})
    social: Social

    @Column({enum: WeekDayEnum})
    workScheduleFrom: WeekDayEnum

    @Column({enum: WeekDayEnum})
    workScheduleTo: WeekDayEnum

}