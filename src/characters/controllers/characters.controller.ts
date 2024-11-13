import { 
    Controller, 
    Get, Post, 
    Body, Param, 
    NotFoundException 
} from '@nestjs/common';
import { AddCharacterRequestDto } from '../dtos/add-character.dto';
import { CharactersService } from '../services/characters.services';

@Controller('api/Character')
export class CharactersController {
    constructor(private characterService: CharactersService){}

    @Get('GetAllCharacters')
    async getAllCharacters(){
        var response = await this.characterService.getAllCharacters();

        //check if the response returns empty object
        if (JSON.stringify(response) === '{}'){
            console.log(response);
            response = {
                errorMessage: 'No character exist',
            }
            throw new NotFoundException(response);
        }

        console.log(response);
        return response;
    }

    @Post('AddCharacter')
    async addCharacters(@Body() reqBody: AddCharacterRequestDto){
        await this.characterService.AddCharacter(reqBody);
        var response = await this.characterService.getAllCharacters();
        console.log(response);
        return response;
    }

    @Get('GetCharacterById/:id')
    async getCharacterById(@Param('id') id: string){
        var response = await this.characterService.getCharacterById(id);
        console.log(response);

        //check if the response returns null
        if (response === null){
            console.log(response);
            var errorResponse = {
                errorMessage: 'Id did not match any character',
            }
            throw new NotFoundException(errorResponse);
        }

        return(response);
    }
}