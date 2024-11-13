import { IsString, IsInt } from 'class-validator';

export class AddCharacterRequestDto{
    @IsString()
    name: string;

    @IsInt()
    hitPoints: number;

    @IsInt()
    strength: number;

    @IsInt()
    defence: number;

    @IsInt()
    intelligence: number;

    @IsString()
    class: string;
}

export class AddCharacterReturnDto{
    name: string;
    hitPoints: number;
    strength: number;
    defence: number;
    intelligence: number;
    class: string;
}