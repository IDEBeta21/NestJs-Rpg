import { Module } from "@nestjs/common";
import { CharactersModule } from "./characters/characters.module";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm]
        }),
            TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
        }),
        CharactersModule
    ]
})

export class AppModule {}