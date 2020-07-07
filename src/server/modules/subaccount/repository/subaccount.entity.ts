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
import {Category} from "../../category/repository/category.entity";
import {Services} from "../../services/repository/services.entity";
import {Contacts} from "../../contacts/repository/contacts.entity";
import {SubAccountPhoto} from "../../subaccount-photo/repository/subaccount-photo.entity";
import {PriceList} from "../../price-list/repository/price-list.entity";

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

    @OneToMany(type => SubAccountPhoto, photo => photo.subAccount, {nullable: true})
    @JoinColumn()
    photos: SubAccountPhoto[]

    @OneToOne(type => PriceList, priceList => priceList.subAccount, {nullable: true})
    @JoinColumn()
    priceList: PriceList


}