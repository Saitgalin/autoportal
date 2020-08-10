import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Autopart} from "../../autopart/repository/autopart.entity";
import {Auto} from "../../auto/repository/auto.entity";
import {SubAccountRequest} from "../../subaccount-request/repository/subaccount-request.entity";

@Entity()
export class Request {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(type => Autopart, autopart => autopart.request, {cascade: true})
    autopart: Autopart[]

    @ManyToOne(type => Auto, auto => auto.request)
    auto: Auto

    @Column({nullable: true})
    vin?: string

    @Column({nullable: true})
    vinpic: string

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    phoneNumber: string

    @Column({nullable: true})
    email: string

    @Column({type: "date", default: new Date()})
    createdAt: Date

    @OneToMany(type => SubAccountRequest, subAccountRequest => subAccountRequest.request)
    subAccountRequests: SubAccountRequest[]
    
}
