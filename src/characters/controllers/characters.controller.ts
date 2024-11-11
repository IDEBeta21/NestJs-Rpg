import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { AddCharacterRequestDto } from '../dtos/add-character.dto';
import { CharactersService } from '../services/characters.services';

@Controller('api/Character')
export class CharactersController {
    constructor(private characterService: CharactersService){}

    @Get('GetAllCharacters')
    getAllCharacters(){
        var response = this.characterService.getAllCharacters();
        console.log(response);
        return response;
    }

    @Post('AddCharacter')
    async addCharacters(@Body() reqBody: AddCharacterRequestDto){
        await this.characterService.AddCharacter(reqBody);
        var response = this.characterService.getAllCharacters();
        console.log(response);
        return response;
    }

    @Get('GetCharacterById/:id')
    getCharacterById(@Param('id') id: string){
        var response = this.characterService.getCharacterById(id);
        console.log(response);
        return(response);
    }
}