import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Account} from "../../account/repository/account.entity";
import {City} from "../../city/repository/city.entity";
import {Category} from "../../category/repository/category.entity";
import {Services} from "../../services/repository/services.entity";
import {Contacts} from "../../contacts/repository/contacts.entity";

@Entity()
export class SubAccount {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Account, account => account.subAccounts)
    account: Account

    @Column()
    title: string

    @Column({nullable: true})
    description?: string

    @ManyToOne(type => Category, category => category.subAccounts)
    category: Category

    @ManyToMany(type => Services, {cascade: true})
    @JoinTable()
    services: Services[]

    @OneToOne(type => Contacts, contacts => contacts.subAccount, {cascade: true})
    @JoinColumn()
    contacts: Contacts

}