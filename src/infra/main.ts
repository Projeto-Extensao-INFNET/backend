import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

import { setupSwagger } from './config/docs';
import { env } from './config/env';

async function bootstrap() {
  const logger: Logger = new Logger('Backend');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: env.DEV_CORS_ORIGIN ?? '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  setupSwagger(app);

  app.setGlobalPrefix('api/v1'); // url da API => http://localhost:3333/api/v1

  await app.listen(env.PORT);
  logger.log(`Project is running on: http://localhost:${env.PORT}/api`);
}
bootstrap();
