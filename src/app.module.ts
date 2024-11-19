import { Module } from "@nestjs/common";
import { CharactersModule } from "./characters/modules/characters.module";

@Module({
    imports: [
        CharactersModule
    ]
})

export class AppModule {}