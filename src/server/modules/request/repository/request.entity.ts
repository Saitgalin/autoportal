import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Autopart} from "../../autopart/repository/autopart.entity";
import {Auto} from "../../auto/repository/auto.entity";

@Entity()
export class Request {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(type => Autopart, autopart => autopart.request, {cascade: true})
    autopart: Autopart[]

    @ManyToOne(type => Auto, auto => auto.request)
    auto: Auto

    @Column()
    vin: string

    @Column({nullable: true})
    vinpic: string

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    phoneNumber: string

    @Column({nullable: true})
    email: string
    
}