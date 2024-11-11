import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";
import { AddCharacterRequestDto } from "../dtos/add-character.dto";

@Injectable()
export class CharactersService {
    async getCharacterById(id: string){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        return characters[id];
    }

    async getAllCharacters(){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        return characters;
    }

    async AddCharacter(reqBody: AddCharacterRequestDto){
        const contents = await readFile('characters.json', 'utf8')
        const characters = JSON.parse(contents);

        const id = Math.floor(Math.random() * 999);

        characters[id] = { id, reqBody };

        await writeFile('characters.json', JSON.stringify(characters));
    }
}