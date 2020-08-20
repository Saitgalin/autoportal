import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import * as smsc from 'smsc/smsc_api';


@Injectable()
export class SmsService {

  constructor(
      private readonly configService: ConfigService
  ) {
    smsc.configure({
      login: this.configService.get('SMSC_LOGIN'),
      password: this.configService.get('SMSC_PASSWORD'),
      //charset: 'utf-8',
      //ssl: true
    })
  }

  async authTest(): Promise<Boolean> {
    return await smsc.test(function(err) {
      return !!err
    })
  }

  async sendSms(phoneNumber: number, smsCode: number): Promise<void> {
    //TODO: message is denied
    //FIX: sending to smsc
    smsc.send_sms({
      phones: [`${phoneNumber}`],
      mes: `Ваш код подтверждения ${smsCode}`,
      cost: 1
    }, function (data, raw, err, code) {
      if (err) {
        Logger.error(smsCode)
        return console.log(err, 'code: ' + code)
      }
      Logger.debug(smsCode)
    })
  }

}
