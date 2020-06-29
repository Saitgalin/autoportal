import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "../../account/repository/account.entity";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Account, account => account.jwtToken)
    account: Account

    @Column({type: "date"})
    expiresAt: Date

    @Column()
    jwtToken: string

}