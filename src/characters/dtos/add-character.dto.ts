import { IsString } from 'class-validator';

export class AddCharacterRequestDto{
    @IsString()
    content: string;
}