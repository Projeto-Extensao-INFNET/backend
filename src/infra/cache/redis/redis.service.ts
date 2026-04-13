import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { env } from '@/config/env';
import Redis from 'ioredis';

@Injectable()
export class RedisService
  extends Redis
  implements OnModuleInit, OnModuleDestroy
{
  private logger: Logger = new Logger('Redis');

  constructor() {
    super({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      db: env.REDIS_DB,
    });
  }

  onModuleInit() {
    this.logger.log('Redis Cache started');
  }

  onModuleDestroy() {
    this.logger.log('Redis Cache disconnected');
    return this.disconnect();
  }
}
