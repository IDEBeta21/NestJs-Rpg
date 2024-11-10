import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { AddCharacterRequestDto } from './dtos/add-character.dto';

@Controller('api/Character')
export class CharactersController {
    @Get('GetAllCharacters')
    getAllCharacters(){

    }

    @Post('AddCharacter')
    addCharacters(@Body() reqBody: AddCharacterRequestDto){
        console.log(reqBody);
        return(reqBody);
    }

    @Get('GetCharacterById/:id')
    getCharacterById(@Param('id') id: string){
        console.log(id)
        return(id)
    }
}