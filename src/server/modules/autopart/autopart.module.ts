import { Module } from '@nestjs/common';
import { AutopartService } from './autopart.service';

@Module({
  providers: [AutopartService]
})
export class AutopartModule {

}
