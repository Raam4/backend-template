import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, tap } from "rxjs";
import { CreateLogDto } from "src/modules/logger/dto/create-log.dto";
import { LogsService } from "src/modules/logger/logs.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logsService: LogsService) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        if(req.originalUrl === '/api/auth/login' || !['POST', 'PATCH'].includes(req.method)){
            return next.handle();
        }
        const data: CreateLogDto = {
            user: req.user.username,
            route: req.originalUrl,
            payload: JSON.stringify(req.body),
            status: null,
            error: null
        }
        return next
        .handle()
        .pipe(
            tap(async () => {
                data.status = context.switchToHttp().getResponse().statusCode;
                await this.logsService.create(data);
            }),
            catchError(async err => {
                data.status = 500;
                data.error = err.message;
                await this.logsService.create(data);
                throw err;
            })
        );
    }
}