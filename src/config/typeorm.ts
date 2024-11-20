import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgrepass890',
    database: 'nestjs_rpgdb',
    entities: ["src/**/**/*.entity{.ts,.js}"],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);