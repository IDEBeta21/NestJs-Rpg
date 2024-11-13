import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";
import { AddCharacterRequestDto, AddCharacterReturnDto } from "../dtos/add-character.dto";
import { GetAllCharactersReturnDto } from "../dtos/get-all-character.dto";
import { Character } from "../models/character.model";

@Injectable()
export class CharactersService {
    async getAllCharacters(){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        const objCharacterReturn: GetAllCharactersReturnDto[] = [];

        // Iterate over each character and create a simplified DTO without the id
        for (const key in characters) {
            if (characters.hasOwnProperty(key)) {
                const character = characters[key];
                const characterDto = new GetAllCharactersReturnDto();

                // Manually assign each property to characterDto
                characterDto.name = character.name;
                characterDto.hitPoints = character.hitPoints;
                characterDto.strength = character.strength;
                characterDto.defence = character.defence;
                characterDto.intelligence = character.intelligence;
                characterDto.class = character.class;

                objCharacterReturn.push(characterDto);
            }
        }

        return objCharacterReturn;
    }

    async AddCharacter(reqBody: AddCharacterRequestDto){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        const id = Math.floor(Math.random() * 999);

        //Manually assign each property to characterDetails
        const characterDetails = new Character();
        characterDetails.id = id;
        characterDetails.name = reqBody.name;
        characterDetails.hitPoints = reqBody.hitPoints;
        characterDetails.strength = reqBody.strength;
        characterDetails.defence = reqBody.defence;
        characterDetails.intelligence = reqBody.intelligence;
        characterDetails.class = reqBody.class;

        characters[id] = characterDetails;

        await writeFile('characters.json', JSON.stringify(characters, null, 2));
    }

    async getCharacterById(id: string){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        const returnBody = new AddCharacterReturnDto();

        const character = characters[id] || null

        // Manually assign each property to returnBody
        if(character != null){
            returnBody.name = character.name;
            returnBody.hitPoints = character.hitPoints;
            returnBody.strength = character.strength;
            returnBody.defence = character.defence;
            returnBody.intelligence = character.intelligence;
            returnBody.class = character.class;

            return returnBody;
        }

        return null;
    }
}