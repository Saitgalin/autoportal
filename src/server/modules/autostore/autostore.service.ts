import { Injectable } from '@nestjs/common';
import {SubAccountService} from "../subaccount/subaccount.service";
import {AutostoreInterface} from "./autostore.interface";


@Injectable()
export class AutostoreService {
  constructor(
      private readonly subAccountService: SubAccountService
  ) {

  }

  async autostore(autostoreId: number): Promise<AutostoreInterface> {
    return await this.subAccountService.subAccount(autostoreId)
  }
}
