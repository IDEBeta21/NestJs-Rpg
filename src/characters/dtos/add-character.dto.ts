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
    code: number;
    success : boolean;
    request: object;
}