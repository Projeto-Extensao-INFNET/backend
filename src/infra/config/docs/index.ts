import { Logger, type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from '../env';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

export const setupSwagger = (app: INestApplication) => {
  const logger: Logger = new Logger('Swagger');

  const config = new DocumentBuilder()
    .setTitle('API Projeto de Extensao')
    .setDescription('API do Projeto de Extensão - documentação Swagger')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (env.NODE_ENV === 'development') {
    const specFile = resolve(__dirname, '../../../swagger.json');
    const spec = JSON.stringify(document, null, 2);

    writeFile(specFile, spec).then(() => {
      logger.log('Swagger spec generated!');
    });
  }
};
