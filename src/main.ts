import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CharactersModule } from './characters/modules/characters.module';

async function bootstrap() {
  const app = await NestFactory.create(CharactersModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
