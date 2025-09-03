import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';
import type { Env } from './config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});

	const configService = app.get<ConfigService<Env, true>>(ConfigService);

	const port = configService.get('PORT', { infer: true });
	const corsOrigin = configService.get('CORS_ORIGIN', { infer: true });

	app.enableCors({ origin: corsOrigin ?? '*' });

	/**
	 *  SWAGGER
	 */
	const config = new DocumentBuilder()
		.setTitle('API Projeto de Extensão ')
		.setDescription('API do meu Projeto de extensão')
		.setVersion('1.0.0')
		.build();

	const document = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.use(
		'/reference',
		apiReference({
			content: document,
		}),
	);

	await app.listen(port ?? 3333);
}
bootstrap();
