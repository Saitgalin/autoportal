import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Autopart} from "../../autopart/repository/autopart.entity";

@Entity()
export class SubAccountRequest {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    viewed: boolean

    @Column({type: "date"})
    createdAt: Date

}