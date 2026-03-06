import { Injectable, type OnModuleDestroy } from '@nestjs/common';
import { env } from '@/config/env';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor() {
    super({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      db: env.REDIS_DB,
    });
  }

  onModuleDestroy() {
    return this.disconnect();
  }
}
