import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SubAccountRequest {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    viewed: boolean


}