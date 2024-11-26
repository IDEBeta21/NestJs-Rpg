import { ApiProperty } from "@nestjs/swagger";

export class GetAllCharactersReturnDto{
    @ApiProperty({ example: 'Devian', description: 'The name of the character' })
    name: string;

    @ApiProperty({ example: 100, description: 'HP of the character' })
    hitPoints: number;

    @ApiProperty({ example: 10, description: 'Strength of the character' })
    strength: number;

    @ApiProperty({ example: 10, description: 'Defence of the character' })
    defence: number;

    @ApiProperty({ example: 10, description: 'Intelligence of the character' })
    intelligence: number;

    @ApiProperty({ example: 'Mage', description: 'Class of the character' })
    class: string;
}