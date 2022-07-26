import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'secret_key',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400 * 7,
        expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    }),
  );
  await app.listen(3123);
}
bootstrap();
