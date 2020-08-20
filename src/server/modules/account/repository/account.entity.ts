import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Token} from "../../jwt-token/repository/token.entity";
import {StatusEnum} from "../../../../common/enum/account/status.enum";

import {SubAccount} from "../../subaccount/repository/subaccount.entity";
import {RegistrationStatusEnum} from "../../../../common/enum/account/registration-status.enum";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: Date, nullable: true})
    birthDate: Date

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    middleName: string

    @Column({nullable: true})
    city: string

    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    driverLicense: number

    //TODO: Временно string, поменять (проблема с Postgres)
    @Column({unique: true})
    phone: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({type: "date", default: new Date()})
    createdAt: Date

    @OneToMany(type => Token, token => token.account)
    jwtToken: Token[]

    //TODO: change to phonePending
    @Column({enum: StatusEnum, default: StatusEnum.active})
    status: StatusEnum

    @Column({enum: RegistrationStatusEnum, default: RegistrationStatusEnum.phoneNumberPending})
    registrationStatus: RegistrationStatusEnum

    @OneToMany(type => SubAccount, subaccount => subaccount.account, {cascade: true})
    subAccounts: SubAccount[]

    @Column({nullable: true})
    smsCode: number
}
