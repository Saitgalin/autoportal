import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AccountModule} from './account/account.module';
import {AuthModule} from './auth/auth.module';
import {JwtTokenModule} from './jwt-token/jwt-token.module';
import {configModule} from "./configure.root";
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    configModule,
    AccountModule,
    AuthModule,
    JwtTokenModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
