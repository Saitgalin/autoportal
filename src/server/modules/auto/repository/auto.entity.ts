import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "../../request/repository/request.entity";

@Entity()
export class Auto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    make: string

    @Column()
    model: string

    @OneToMany(type => Request, request => request.auto)
    request: Request[]

    @Column({nullable: true})
    imagePath?: string

}