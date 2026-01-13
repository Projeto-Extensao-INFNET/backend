import z from 'zod';
import { loadEnvFile } from 'node:process';
import { PORT } from '../../shared/constants/index';

// Carrega o arquivo .env
loadEnvFile('.env');

// VALIDAÇÃO DAS VARIÁVEIS DE AMBIENTE COM ZOD

export const envSchema = z.object({
  DATABASE_URL: z.url().startsWith('postgresql://'),
  PORT: z.coerce.number().optional().default(PORT),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  CORS_ORIGIN: z.url().startsWith('http://localhost:'),
  JWT_SECRET: z.string(),
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
