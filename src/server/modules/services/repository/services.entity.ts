import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../../category/repository/category.entity";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";

@Entity()
export class Services {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(type => Category, category => category.services)
    category: Category

    @OneToMany(type => SubAccount, subAccount => subAccount.services)
    subAccount: SubAccount

}