import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";
import {Address} from "../../address/repository/address.entity";
import {Social} from "../../social/repository/social.entity";
import {WeekDayEnum} from "../../../../common/dto/subaccount/weekday.enum";

@Entity()
export class Contacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    phoneNumber?: string

    @Column({nullable: true})
    website?: string

    @OneToOne(type => SubAccount, subaccount => subaccount.contacts)
    subAccount: SubAccount

    @OneToMany(type => Address, address => address.contacts, {cascade: true, eager: true})
    addresses: Address[]

    @OneToOne(type => Social, social => social.contacts, {cascade: true, eager: true})
    @JoinColumn()
    social: Social

    @Column({enum: WeekDayEnum})
    workScheduleFrom: WeekDayEnum

    @Column({enum: WeekDayEnum})
    workScheduleTo: WeekDayEnum

}
