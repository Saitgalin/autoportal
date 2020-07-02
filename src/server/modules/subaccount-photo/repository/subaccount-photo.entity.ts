import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";

@Entity()
export class SubAccountPhoto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    @ManyToOne(type => SubAccount, subAccount => subAccount.photos, {cascade: true})
    subAccount: SubAccount
}