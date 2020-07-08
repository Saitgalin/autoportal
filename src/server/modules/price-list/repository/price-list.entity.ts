import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";

@Entity()
export class PriceList {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    @OneToOne(type => SubAccount, subAccount => subAccount.priceList, {cascade: true})
    subAccount: SubAccount
}