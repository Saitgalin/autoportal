import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Contacts} from "../../contacts/repository/contacts.entity";

@Entity()
export class Social {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(type => Contacts, contacts => contacts.social)
    contacts: Contacts

    @Column()
    vk: string

    @Column()
    fb: string

    @Column()
    youtube: string

    @Column()
    ok: string

    @Column()
    inst: string

    @Column()
    tweet: string
}