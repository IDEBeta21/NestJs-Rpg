import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const isMigration = process.env.NODE_ENV === 'migration';

const config = {
    type: 'postgres',
    host: process.env.HOST ?? 'localhost', 
    port: 5435,
    username: 'postgres',
    password: 'psqladminpass',
    database: 'nestjs_rpgdb',
    entities: isMigration 
        ? ["src/**/*.entity{.ts,.js}"]
        : ["dist/**/*.entity{.ts,.js}"],
    migrations: isMigration
        ? ["src/migrations/*{.ts,.js}"]
        : ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);