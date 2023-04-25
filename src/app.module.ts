import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth-rbac/auth/auth.module';
import { FilesModule } from './files/files.module';
import { LogsModule } from './modules/logger/logs.module';
import { RolesModule } from './modules/auth-rbac/roles/roles.module';
import { RutasModule } from './modules/auth-rbac/rutas/rutas.module';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { NullifyMiddleware } from './common/middleware/nullify.middleware';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    FilesModule,
    LogsModule,
    RolesModule,
    RutasModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NullifyMiddleware)
      .forRoutes(
        { path: '*', method: RequestMethod.PATCH},
        { path: '*', method: RequestMethod.POST},
        { path: '*', method: RequestMethod.PUT}
      );
  }
}
