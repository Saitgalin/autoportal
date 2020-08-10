import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Автопортал')
      .setDescription('Документация API')
      .setVersion('1.0')
      .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.useStaticAssets(path.join(__dirname, '..', 'public'))
  app.setBaseViewsDir(path.join(__dirname, 'views'))
  app.set('view engine', 'js')
  app.engine('js', require('express-react-views').createEngine())

  //BodyParser
  app.use(bodyParser.json({limit: '15mb'}))
  app.use(bodyParser.urlencoded({limit: '15mb', extended: true}))

  app.enableCors()
  await app.listen(3999)
}
bootstrap();
