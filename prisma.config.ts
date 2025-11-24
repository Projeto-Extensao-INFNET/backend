import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { env } from './src/core/config/env';

const DATABASE_URL = env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: DATABASE_URL,
  },
});
