import { Injectable } from "@nestjs/common";

import { AddCharacterRequestDto, AddCharacterReturnDto } from "./dtos/add-character.dto";
import { GetCharacterByIdReturnDto } from "./dtos/get-character-by-id";
import { GetAllCharactersReturnDto } from "./dtos/get-all-character.dto";
import { UpdateCharacterReturnDto, UpdateCharacterRequestDto } from "./dtos/update-character.dto";
import { DeleteCharacterReturnDto } from "./dtos/delete-character.dto";

import { Character } from "./entities/character.entity";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CharactersService {

    constructor(
        @InjectRepository(Character)
        private readonly characterRepository: Repository<Character>,
      ) {}
    

    async getAllCharacters(): Promise<GetAllCharactersReturnDto[]>{
        const characters = await this.characterRepository.find({
            order: { id: 'ASC' }
        });

        if(characters.length == 0){
            return null;
        }

        return characters.map(c => ({
            id: c.id,
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
        
        const characters =  await this.characterRepository.find({
            order: { id: 'ASC'  }
        });
        return characters.map(c => ({
            id: c.id,
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

    async updateCharacter(id: number, updateCharacter: UpdateCharacterRequestDto): Promise<UpdateCharacterReturnDto>{
        await this.characterRepository.update(id, updateCharacter);

        const character = await this.characterRepository.findOne({where: {id}});

        if (!character){
            return null;
        }

        return {
            id: character.id,
            name: character.name,
            hitPoints: character.hitPoints,
            strength: character.strength,
            defence: character.defence,
            intelligence: character.intelligence,
            class: character.class
        };
    }

    async deleteCharacter(id: number): Promise<DeleteCharacterReturnDto[]>{
        await this.characterRepository.delete(id);

        const characters = await this.characterRepository.find({
            order: { id: 'ASC' }
        });

        if(characters.length == 0){
            return null;
        }

        return characters.map(c => ({
            id: c.id,
            name: c.name,
            hitPoints: c.hitPoints,
            strength: c.strength,
            defence:  c.defence,
            intelligence: c.intelligence,
            class: c.class
        }));
    }
}