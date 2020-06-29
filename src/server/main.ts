import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Автопортал')
      .setDescription('API Документация')
      .setVersion('1.0')
      .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.useStaticAssets(path.join(__dirname, '..', 'public'))
  app.setBaseViewsDir(path.join(__dirname, 'views'))
  app.set('view engine', 'js')
  app.engine('js', require('express-react-views').createEngine())
  await app.listen(3000)
}
bootstrap();
