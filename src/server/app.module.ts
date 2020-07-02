import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AccountModule} from './modules/account/account.module';
import {AuthModule} from './modules/auth/auth.module';
import {JwtTokenModule} from './modules/jwt-token/jwt-token.module';
import {configModule} from "./configure.root";
import { MailModule } from './modules/mail/mail.module';
import { SubAccountModule } from './modules/subaccount/subaccount.module';
import { CityModule } from './modules/city/city.module';
import { CategoryModule } from './modules/category/category.module';
import { ServicesModule } from './modules/services/services.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AddressModule } from './modules/address/address.module';
import { SocialModule } from './modules/social/social.module';
import { AutoModule } from './modules/auto/auto.module';
import { RequestModule } from './modules/request/request.module';
import { AutopartModule } from './modules/autopart/autopart.module';
import { SubAccountRequestModule } from './modules/subaccount-request/subaccount-request.module';
import { SubaccountPhotoModule } from './modules/subaccount-photo/subaccount-photo.module';


@Module({
  imports: [
    configModule,
    AccountModule,
    AuthModule,
    JwtTokenModule,
    MailModule,
    SubAccountModule,
    CityModule,
    CategoryModule,
    ServicesModule,
    ContactsModule,
    AddressModule,
    SocialModule,
    AutoModule,
    RequestModule,
    AutopartModule,
    SubAccountRequestModule,
    SubaccountPhotoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
