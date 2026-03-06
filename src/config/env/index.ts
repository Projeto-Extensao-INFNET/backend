import { loadEnvFile } from 'node:process';
import {
  DEV_CORS_ORIGIN,
  PORT,
  REDIS_DB,
  REDIS_HOST,
  REDIS_PORT,
} from '../../shared/constants';
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
  PORT: z.coerce.number().optional().default(PORT),
  REDIS_HOST: z.string().optional().default(REDIS_HOST),
  REDIS_PORT: z.coerce.number().default(REDIS_PORT),
  REDIS_DB: z.coerce.number().default(REDIS_DB),
  DEV_CORS_ORIGIN: z.url().startsWith(DEV_CORS_ORIGIN),
});

// VALIDA O process.env COM Zod

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Erro ao validar variáveis de ambiente!');
  }
  throw new Error('❌ Variáveis de ambiente inválidas!');
}

export const env = _env.data;
