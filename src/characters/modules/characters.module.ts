import { Module } from '@nestjs/common';
import { CharactersController } from '../controllers/characters.controller';
import { CharactersService } from '../services/characters.services';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharactersModule {}
