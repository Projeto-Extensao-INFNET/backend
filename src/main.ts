import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './core/config/docs';
import type { Env } from './core/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const configService = app.get<ConfigService<Env, true>>(ConfigService);

  /**
   * CORS
   */
  const corsOrigin = configService.get('CORS_ORIGIN', { infer: true });
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
  const port = configService.get('PORT', { infer: true });
  await app.listen(port ?? 3333);
}
bootstrap();
