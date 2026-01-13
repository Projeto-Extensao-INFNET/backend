import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '../config/docs';
import { env } from '../config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.enableCors({
    origin: env.CORS_ORIGIN ?? '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  setupSwagger(app);

  await app.listen(env.PORT);
}
bootstrap();
