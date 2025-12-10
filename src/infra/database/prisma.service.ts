import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { env } from '@/core/config/env';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = env.DATABASE_URL;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString,
    });

    super({
      adapter,
      log:
        env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  async onModuleInit() {
    try {
      Logger.log('Database connection OK!');
    } catch (error) {
      Logger.error(`Database connection failed ${error}`);
    } finally {
      return this.$connect();
    }
  }
  onModuleDestroy() {
    return this.$disconnect();
  }
}
