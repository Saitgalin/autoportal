import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AccountModule} from "../account/account.module";
import {JwtTokenModule} from "../jwt-token/jwt-token.module";

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt'}),
      JwtModule.register({
          secret: 'secretJwtToken',
          signOptions: { expiresIn:  '1d' },
      }),
      AccountModule,
      JwtTokenModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {

}
