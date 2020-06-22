import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AccountModule} from "../account/account.module";
import {JwtTokenModule} from "../jwt-token/jwt-token.module";
import {configModule} from "../../configure.root";
import {MailModule} from "../mail/mail.module";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt'}),
      JwtModule.register({
          secret: 'secretJwtToken',
          signOptions: { expiresIn:  '1d' },
      }),
      AccountModule,
      JwtTokenModule,
      configModule,
      MailModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {

}
