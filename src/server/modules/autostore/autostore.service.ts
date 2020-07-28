import {BadRequestException, Injectable} from '@nestjs/common';
import {SubAccountService} from "../subaccount/subaccount.service";
import {AutostoreInterface} from "./autostore.interface";
import {ServicesService} from "../services/services.service";
import {AutoTypeEnum} from "../../../common/enum/auto/auto-type.enum";
import {SubAccount} from "../subaccount/repository/subaccount.entity";
import {Services} from "../services/repository/services.entity";


@Injectable()
export class AutostoreService {
  constructor(
      private readonly subAccountService: SubAccountService,
      private readonly servicesService: ServicesService
  ) {

  }

  async autostore(autostoreId: number): Promise<AutostoreInterface> {
    return await this.subAccountService.subAccount(autostoreId)
  }

  async setService(serviceTitle: string, autoType: AutoTypeEnum, subAccount: SubAccount): Promise<SubAccount> {
    const service = await this.servicesService.findByTitleAndAutoType(serviceTitle, autoType)
    if (subAccount.services.includes(service)) {
      throw new BadRequestException('Эта услуга уже имеется у автомагазина')
    }

    subAccount.services.push(service)
    return await this.subAccountService.save(subAccount)
  }

}
