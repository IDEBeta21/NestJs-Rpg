import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

var db_host;
if(process.env.NODE_ENV == 'dev'){
    db_host = 'nestjs-rpgdb'
}else{
    db_host = 'localhost'
}

const config = {
    type: 'postgres',
    host: db_host, 
    port: 5435,
    username: 'postgres',
    password: 'psqladminpass',
    database: 'nestjs_rpgdb',
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);