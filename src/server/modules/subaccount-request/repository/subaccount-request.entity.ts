import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "../../request/repository/request.entity";

@Entity()
export class SubAccountRequest {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    viewed: boolean

    @ManyToOne(type => Request, request => request.subAccountRequest)
    request: Request

}