import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(type => SubAccount, subaccount => subaccount.city)
    subAccounts: SubAccount

}