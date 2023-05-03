import { DataSource } from "typeorm";
import { ormConfig } from "./orm.config";

export default new DataSource({
    ...ormConfig,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../**/migrations/*.{js,ts}'],
    logging: true
});