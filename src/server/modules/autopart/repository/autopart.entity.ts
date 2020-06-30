import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "../../request/repository/request.entity"
import {AutopartTypeEnum} from "../../../../common/enum/request/autopart-type.enum";

@Entity()
export class Autopart {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({enum: AutopartTypeEnum})
    type: AutopartTypeEnum

    @ManyToOne(type => Request, request => request.autopart)
    request: Request

}