import {Connection} from "typeorm";
import {SubAccountRequest} from "./subaccount-request.entity";

export const subAccountRequestProviders = [
  {
    provide: 'SUBACCOUNT_REQUEST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SubAccountRequest),
    inject: ['DATABASE_CONNECTION']
  }
]
