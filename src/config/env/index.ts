import z from 'zod';

/**
 * VALIDAÇÃO DAS VARIÁVEIS DE AMBIENTE COM ZOD
 */
export const envSchema = z
  .object({
    POSTGRESQL_USERNAME: z.string(),
    POSTGRESQL_PASSWORD: z.string(),
    POSTGRESQL_HOST: z.string(),
    POSTGRESQL_PORT: z.coerce.number(),
    POSTGRESQL_DATABASE: z.string(),
    PORT: z.coerce.number().optional().default(3333),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    CORS_ORIGIN: z.url().startsWith('http://localhost:'),
    JWT_SECRET: z.string(),
  })
  .transform((data) => ({
    ...data,
    DATABASE_URL: `postgresql://${data.POSTGRESQL_USERNAME}:${data.POSTGRESQL_PASSWORD}@${data.POSTGRESQL_HOST}:${data.POSTGRESQL_PORT}/${data.POSTGRESQL_DATABASE}?schema=public`,
  }));

/**
 * VALIDA O process.env COM Zod
 */
const _env = envSchema.safeParse({
  POSTGRESQL_USERNAME: process.env.POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD,
  POSTGRESQL_HOST: process.env.POSTGRESQL_HOST,
  POSTGRESQL_PORT: process.env.POSTGRESQL_PORT,
  POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  JWT_SECRET: process.env.JWT_SECRET,
});

if (_env.success === false) {
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Erro ao validar variáveis de ambiente!');
  }
  throw new Error('❌ Variáveis de ambiente inválidas!');
}

export const env = _env.data;
