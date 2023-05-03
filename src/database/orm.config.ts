import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSourceOptions } from "typeorm";

config();

const configService = new ConfigService();

export const ormConfig: DataSourceOptions = {
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: configService.get('MYSQL_PORT'),
    username: configService.get('MYSQL_USER'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    supportBigNumbers: true,
    dateStrings: true
};