import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { JwtTokenModule } from './jwt-token/jwt-token.module';
import * as path from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => ({
        dataPath: path.resolve(__dirname, '..', '..', 'data')
      })],
      isGlobal: true
    }),
    AccountModule,
    AuthModule,
    JwtTokenModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
