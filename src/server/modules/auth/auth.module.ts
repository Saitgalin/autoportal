import {HttpModule, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AccountModule} from "../account/account.module";
import {JwtTokenModule} from "../jwt-token/jwt-token.module";
import {configModule} from "../../configure.root";
import {MailModule} from "../mail/mail.module";
import {JwtStrategy} from "./jwt.strategy";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";

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
      MailModule,
      HttpModule.register({
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token e7cbf2b216a036fa53fc48f642455e7a3e5896ec'
        }
      })
  ],
  providers: [
      AuthService,
      JwtStrategy,
      AuthenticationGuard
  ],
  controllers: [AuthController]
})
export class AuthModule {

}
