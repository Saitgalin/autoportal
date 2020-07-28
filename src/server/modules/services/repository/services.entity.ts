import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../../category/repository/category.entity";
import {AutoTypeEnum} from "../../../../common/enum/auto/auto-type.enum";

@Entity()
export class Services {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(type => Category, category => category.services)
    @JoinColumn()
    category: Category

    @Column({enum: AutoTypeEnum, nullable: true})
    autoType?: AutoTypeEnum

}
