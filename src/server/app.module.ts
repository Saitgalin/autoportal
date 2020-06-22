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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
