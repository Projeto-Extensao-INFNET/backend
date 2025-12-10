import z from 'zod';

/**
 * VALIDAÇÃO DAS VARIÁVEIS DE AMBIENTE COM ZOD
 */
export const envSchema = z.object({
  DATABASE_URL: z.url().startsWith('postgresql://'),
  PORT: z.coerce.number().optional().default(3333),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  CORS_ORIGIN: z.url().startsWith('http://localhost:'),
  JWT_SECRET: z.string(),
});

/**
 * VALIDA O process.env COM Zod
 */
const _env = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
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
