import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";
import {SubAccountCategoryEnum} from "../../../../common/enum/subaccount/subaccount-category.enum";
import {Services} from "../../services/repository/services.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({enum: SubAccountCategoryEnum})
    title: SubAccountCategoryEnum

    @OneToMany(type => SubAccount, subAccount => subAccount.category)
    subAccounts: SubAccount[]

    @OneToMany(type => Services, services => services.category)
    services: Services[]
}
