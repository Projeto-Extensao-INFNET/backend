import { loadEnvFile } from 'node:process';
import z from 'zod';

// Carrega o arquivo .env
loadEnvFile('.env');

// VALIDAÇÃO DAS VARIÁVEIS DE AMBIENTE COM ZOD
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.url().startsWith('postgresql://'),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRATION: z.coerce.number(),
  JWT_REFRESH_TOKEN_EXPIRATION: z.coerce.number(),
  PORT: z.coerce.number(),
  REDIS_PORT: z.coerce.number(),
  REDIS_HOST: z.string().optional(),
  REDIS_DB: z.coerce.number(),
  DEV_CORS_ORIGIN: z.url().startsWith('http://localhost:'),
});

// Valida o process.env com Zod
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  if (process.env.NODE_ENV === 'development') {
    console.error(
      '❌ Erro ao validar variáveis de ambiente!',
      z.treeifyError(_env.error),
    );
  }
  throw new Error('❌ Variáveis de ambiente inválidas!');
}

export const env = _env.data;
