import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Token} from "../../jwt-token/repository/token.entity";
import {StatusEnum} from "../../../../common/enum/account/status.enum";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fio: string

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
    @Column({enum: StatusEnum, default: StatusEnum.phoneNumberPending})
    status: StatusEnum

    @OneToMany(type => SubAccount, subaccount => subaccount.account, {cascade: true})
    subAccounts: SubAccount[]

    @Column({nullable: true})
    smsCode: number
}
