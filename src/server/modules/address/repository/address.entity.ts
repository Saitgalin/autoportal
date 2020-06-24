import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "../../city/repository/city.entity";
import {Contacts} from "../../contacts/repository/contacts.entity";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => City, city => city.addresses, {cascade: true})
    city: City

    @Column()
    street: string

    @Column()
    houseNumber: string

    @ManyToOne(type => Contacts, contacts => contacts)
    contacts: Contacts
}