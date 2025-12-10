import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '../config/docs';
import { env } from '../config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  /**
   * CORS
   */
  const corsOrigin = env.CORS_ORIGIN;
  app.enableCors({
    origin: corsOrigin ?? '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /**
   * SWAGGER
   */
  setupSwagger(app);

  /**
   * HTTP SERVER
   */
  const port = env.PORT;
  await app.listen(port ?? 3333);
}
bootstrap();
