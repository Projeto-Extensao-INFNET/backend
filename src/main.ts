import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/docs';
import type { Env } from './config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});

	const configService = app.get<ConfigService<Env, true>>(ConfigService);

	/**
	 * CORS
	 */
	const corsOrigin = configService.get('CORS_ORIGIN', { infer: true });
	app.enableCors({ origin: corsOrigin ?? '*' });

	/**
	 * SWAGGER
   -> documentação disponível em 'http://localhost:3333/api'
	 */
	setupSwagger(app);

	/**
	 * HTTP SERVER
	 */
	const port = configService.get('PORT', { infer: true });
	await app.listen(port ?? 3333);
}
bootstrap();
