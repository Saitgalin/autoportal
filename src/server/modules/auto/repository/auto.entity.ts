import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "../../request/repository/request.entity";
import {AutoTypeEnum} from "../../../../common/enum/auto/auto-type.enum";

@Entity()
export class Auto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    make: string

    @Column({enum: AutoTypeEnum, default: AutoTypeEnum.passenger})
    type: AutoTypeEnum

    //TODO: привести к нормальной форме, вынести модельку в новую табличку
    @Column()
    model: string

    @OneToMany(type => Request, request => request.auto)
    request: Request[]

    @Column({nullable: true})
    imagePath?: string

}
