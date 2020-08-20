import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import {configModule} from "../../configure.root";

@Module({
  imports: [configModule],
  providers: [SmsService],
  exports: [SmsService]
})
export class SmsModule {}
