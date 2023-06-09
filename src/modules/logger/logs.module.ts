import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Log } from "./entities/log.entity";
import { LogsService } from "./logs.service";

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [LogsService],
    exports: [LogsService]
})
export class LogsModule {}