import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';


async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./src/cert/key.pem'),
    cert: fs.readFileSync('./src/cert/cert.pem'),
  };

  const app = await NestFactory.create(
    AppModule,
    { httpsOptions },
  );
  app.useGlobalPipes(
    new ValidationPipe()
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Character API')
    .setDescription('API documentation for the Character module')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3001);

  console.log("View Swagger in: https://localhost:3001/swagger")
}
bootstrap();
