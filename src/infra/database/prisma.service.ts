import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { env } from '@/config/env';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: env.DATABASE_URL,
    });

    super({
      adapter,
      log:
        env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  async onModuleInit() {
    try {
      Logger.log('========================');
      Logger.log('Database connection OK!');
      Logger.log('========================');
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
