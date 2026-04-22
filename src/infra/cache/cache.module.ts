import { Global, Module } from '@nestjs/common';
import { CacheModule as Cache } from '@nestjs/cache-manager';

import { RedisClientOptions } from 'redis';
import KeyvRedis from '@keyv/redis';

import { env } from '@/config/env';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    Cache.register<RedisClientOptions>({
      stores: [
        new KeyvRedis(
          `redis://${env.REDIS_HOST ?? 'localhost'}:${env.REDIS_PORT ?? 6379}`,
        ),
      ],
      isGlobal: true,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
