import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('characters')
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    hitPoints: number;

    @Column()
    strength: number;

    @Column()
    defence: number;

    @Column()
    intelligence: number;

    @Column()
    class: string;
}
