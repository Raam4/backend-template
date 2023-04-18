import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Log } from "./entities/log.entity";
import { Repository } from "typeorm";
import { CreateLogDto } from "./dto/create-log.dto";

@Injectable()
export class LogsService{
    constructor(
        @InjectRepository(Log)
        private logsRepository: Repository<Log>
    ){}

    async create(log: CreateLogDto): Promise<Log>{
        const createdLog = this.logsRepository.create(log);
        const savedLog = await this.logsRepository.save(createdLog);
        return savedLog;
    }
}