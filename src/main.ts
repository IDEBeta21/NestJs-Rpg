import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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

  await app.listen(process.env.PORT ?? 3000);

  if(process.env.NODE_ENV == 'dev'){
    console.log("\nView Swagger in: \x1b[34mhttp://localhost:3001/swagger\x1b[0m. Happy Codings!!")
  }else{
    console.log("\nView Swagger in: \x1b[34mhttp://localhost:3000/swagger\x1b[0m. Happy Codings!!")
  }
}
bootstrap();
