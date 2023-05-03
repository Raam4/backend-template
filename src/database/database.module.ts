import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true,
      synchronize: true, /* comentar en producción */
      logging: true /* comentar en producción */
    })
  ],
})
export class DatabaseModule {}