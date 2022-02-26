import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from 'src/modules/app/app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { Express } from 'express-serve-static-core';

const server = express();

export const createNestServer = async (expressInstance: Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  return app.init();
};

createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);
