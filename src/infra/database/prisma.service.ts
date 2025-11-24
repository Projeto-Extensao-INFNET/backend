import {
  Inject,
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';
import { env, Env } from '@/core/config/env';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = env.DATABASE_URL;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@Inject(ConfigService) configService: ConfigService<Env, true>) {
    const adapter = new PrismaPg({
      connectionString,
    });

    super({
      adapter,
      log:
        configService.get('NODE_ENV', { infer: true }) === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
    });
  }
  onModuleInit() {
    return this.$connect();
  }
  onModuleDestroy() {
    return this.$disconnect();
  }
}
