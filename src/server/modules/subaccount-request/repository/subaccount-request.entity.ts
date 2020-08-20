import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "../../request/repository/request.entity";
import {SubAccount} from "../../subaccount/repository/subaccount.entity";

@Entity()
export class SubAccountRequest {

  @PrimaryGeneratedColumn()
  id: number

  @Column({default: false})
  viewed: boolean

  @ManyToOne(type => Request, request => request.subAccountRequests, {cascade: true})
  request: Request

  @ManyToOne(type => SubAccount, subAccount => subAccount.subAccountRequests, {cascade: true})
  subAccount: SubAccount

}
