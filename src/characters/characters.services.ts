import { Injectable } from "@nestjs/common";
import { AddCharacterRequestDto, AddCharacterReturnDto } from "./dtos/add-character.dto";
import { GetCharacterByIdReturnDto } from "./dtos/get-character-by-id";
import { GetAllCharactersReturnDto } from "./dtos/get-all-character.dto";
import { Character as characterEnt } from "./entities/character.entity";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CharactersService {

    constructor(
        @InjectRepository(characterEnt)
        private readonly characterRepository: Repository<characterEnt>,
      ) {}
    

    async getAllCharacters(): Promise<GetAllCharactersReturnDto[]>{
        const characters = await this.characterRepository.find();

        if(characters.length == 0){
            return null;
        }

        return characters.map(c => ({
            name: c.name,
            hitPoints: c.hitPoints,
            strength: c.strength,
            defence:  c.defence,
            intelligence: c.intelligence,
            class: c.class
        }));
    }

    async AddCharacter(reqBody: AddCharacterRequestDto): Promise<AddCharacterReturnDto[]>{
        const character = this.characterRepository.create(reqBody);
        await this.characterRepository.save(character);
        
        const characters =  await this.characterRepository.find();
        return characters.map(c => ({
            name: c.name,
            hitPoints: c.hitPoints,
            strength: c.strength,
            defence:  c.defence,
            intelligence: c.intelligence,
            class: c.class
        }));
    }

    async getCharacterById(id: number): Promise<GetCharacterByIdReturnDto> {
        const character = await this.characterRepository.findOne({where: {id}});

        if (!character){
            return null;
        }

        return {
            name: character.name,
            hitPoints: character.hitPoints,
            strength: character.strength,
            defence: character.defence,
            intelligence: character.intelligence,
            class: character.class
        };
    }
}