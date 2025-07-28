import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { Env } from './config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});

	const configService = app.get<ConfigService<Env, true>>(ConfigService);

	const port = configService.get('PORT', { infer: true });
	const corsOrigin = configService.get('CORS_ORIGIN', { infer: true });

	app.enableCors({ origin: corsOrigin ?? '*' });

	await app.listen(port ?? 3333);
}
bootstrap();
