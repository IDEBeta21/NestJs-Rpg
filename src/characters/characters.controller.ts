import { 
    Controller, 
    Get, Post, 
    Body, Param, 
    NotFoundException 
} from '@nestjs/common';
import { AddCharacterRequestDto } from './dtos/add-character.dto';
import { CharactersService } from './characters.services';

@Controller('api/Character')
export class CharactersController {
    constructor(private readonly characterService: CharactersService){}

    @Get('GetAllCharacters')
    async getAllCharacters(){
        var response = await this.characterService.getAllCharacters();

        //check if the response returns empty object
        if (response == null){
            console.log(response);
            var errorResponse = {
                errorMessage: 'No character exist',
            }
            throw new NotFoundException(errorResponse);
        }

        console.log(response);
        return response;
    }

    @Post('AddCharacter')
    async addCharacters(@Body() reqBody: AddCharacterRequestDto){
        var response = await this.characterService.AddCharacter(reqBody);
        console.log(response);
        return response;
    }

    @Get('GetCharacterById/:id')
    async getCharacterById(@Param('id') id: number){
        var response = await this.characterService.getCharacterById(id);
        console.log(response);

        //check if the response returns null
        if (response == null){
            console.log(response);
            var errorResponse = {
                errorMessage: 'Id did not match any character',
            }
            throw new NotFoundException(errorResponse);
        }

        return(response);
    }
}