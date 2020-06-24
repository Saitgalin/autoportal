import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "../../address/repository/address.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(type => Address, address => address.city)
    addresses: Address

}