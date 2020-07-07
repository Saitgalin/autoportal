import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {City} from "../../city/repository/city.entity";
import {Contacts} from "../../contacts/repository/contacts.entity";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => City, city => city.addresses)
    city: City

    @Column()
    street: string

    @Column()
    houseNumber: string

    @ManyToOne(type => Contacts, contacts => contacts.addresses)
    contacts: Contacts
}