import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/* import { ExpressAdapter } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https'; */

async function bootstrap() {

  /* const httpOptions = {
    key: fs.readFileSync('../certs/privkey.pem'),
    cert: fs.readFileSync('../certs/cert.pem')
  };
  const server = express();
  */

  const app = await NestFactory.create(
    AppModule,
    /* new ExpressAdapter(server), */
  );
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000); //comment this line to use https

  /* await app.init();
  http.createServer(server).listen(3004);
  https.createServer(httpOptions, server).listen(3005); */
}
bootstrap();
