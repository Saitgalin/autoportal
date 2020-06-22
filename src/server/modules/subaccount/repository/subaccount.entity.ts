import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "../../account/repository/account.entity";
import {City} from "../../city/repository/city.entity";
import {Category} from "../../category/repository/category.entity";
import {Services} from "../../services/repository/services.entity";

@Entity()
export class SubAccount {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Account, account => account.subAccounts)
    account: Account

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(type => City, city => city.subAccounts)
    city: City

    @ManyToOne(type => Category, category => category.subAccounts)
    category: Category

    @ManyToOne(type => Services, services => services.subAccount)
    services: Services

}