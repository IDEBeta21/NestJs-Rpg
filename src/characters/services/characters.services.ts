import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";
import { AddCharacterRequestDto } from "../dtos/add-character.dto";
import { Character } from "../models/character.model";

@Injectable()
export class CharactersService {
    async getAllCharacters(){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        return characters;
    }

    async AddCharacter(reqBody: AddCharacterRequestDto){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        const id = Math.floor(Math.random() * 999);

        //map id and request data to model
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

        return characters[id] || null;
    }
}