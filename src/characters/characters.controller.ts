import { 
    Controller, 
    Get, Post, 
    Body, Param, 
    NotFoundException, 
    Put,
    Delete
} from '@nestjs/common';

import { AddCharacterRequestDto, AddCharacterReturnDto } from './dtos/add-character.dto';
import { GetAllCharactersReturnDto } from './dtos/get-all-character.dto';
import { GetCharacterByIdReturnDto } from './dtos/get-character-by-id';
import { UpdateCharacterRequestDto, UpdateCharacterReturnDto } from './dtos/update-character.dto';
import { DeleteCharacterReturnDto } from './dtos/delete-character.dto';

import { CharactersService } from './characters.services';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/Character')
export class CharactersController {
    constructor(private readonly characterService: CharactersService){}

    @Get('GetAllCharacters')
    @ApiOperation({ summary: 'Retrieve all characters' })
    @ApiResponse({ status: 200, description: 'List of all characters', type: [GetAllCharactersReturnDto] })
    async getAllCharacters(){
        var response = (await this.characterService.getAllCharacters());

        //check if the response returns empty object
        if (response == null){
            console.log(response);
            var errorResponse = {
                errorMessage: 'No character exist',
            }
            throw new NotFoundException(errorResponse);
        }

        return response;
    }

    @Post('AddCharacter')
    @ApiOperation({ summary: 'Add single character' })
    @ApiResponse({ status: 200, description: 'List of all characters', type: [AddCharacterReturnDto] })
    async addCharacters(@Body() reqBody: AddCharacterRequestDto){
        var response = await this.characterService.AddCharacter(reqBody);
        return response;
    }

    @Get('GetCharacterById/:id')
    @ApiOperation({ summary: 'Return info for a single character' })
    @ApiResponse({ status: 200, description: 'Single character information', type: GetCharacterByIdReturnDto })
    async getCharacterById(@Param('id') id: number){
        var response = await this.characterService.getCharacterById(id);

        //check if the response returns null
        if (response == null){
            var errorResponse = {
                errorMessage: 'Id did not match any character',
            }
            throw new NotFoundException(errorResponse);
        }

        return(response);
    }

    @Put('UpdateCharacter/:id')
    @ApiOperation({ summary: 'Update single character with ID' })
    @ApiResponse({ status: 200, description: 'Update character information', type: UpdateCharacterReturnDto })
    async updateCharacter(@Param('id') id: number, @Body() reqBody:UpdateCharacterRequestDto){
        var response = await this.characterService.updateCharacter(id, reqBody);

        //check if the response returns null
        if (response == null){
            var errorResponse = {
                errorMessage: 'Id did not match any character',
            }
            throw new NotFoundException(errorResponse);
        }

        return(response);
    }

    @Delete('DeleteCharacter/:id')
    @ApiOperation({ summary: 'Delete single character with ID' })
    @ApiResponse({ status: 200, description: 'Delete character information', type: DeleteCharacterReturnDto })
    async deleteCharacter(@Param('id') id: number){
        var response = await this.characterService.deleteCharacter(id);

        //check if the response returns null
        if (response == null){
            var errorResponse = {
                errorMessage: 'Id did not match any character',
            }
            throw new NotFoundException(errorResponse);
        }

        return(response);
    }
}