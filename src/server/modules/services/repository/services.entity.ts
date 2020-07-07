import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../../category/repository/category.entity";

@Entity()
export class Services {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(type => Category, category => category.services)
    category: Category

}