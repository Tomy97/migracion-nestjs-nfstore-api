import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { CORS } from './contains/cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
const mercadopago = require("mercadopago");

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(CORS);
  app.use(morgan('dev'));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
    index: false, // Si no se debe permitir la visualización de un índice de archivos en la carpeta
  });
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NfStore API')
    .setDescription('API para la aplicación NfStore')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // SDK de Mercado Pago
  // Agrega credenciales
  mercadopago.configure({
    access_token: 'APP_USR-5692623734442597-071318-5317a02cee5dfbe53d8d2ca4713b7578-238788393',
  });

  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT') || 4000);
}
bootstrap();
