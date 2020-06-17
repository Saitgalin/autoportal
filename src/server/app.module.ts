import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => ({
        dataPath: path.resolve(__dirname, '..', '..', 'data')
      })],
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
