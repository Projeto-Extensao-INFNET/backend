import { Module } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { RedisCacheRepository } from './redis/redis-cache-repository';
import { CacheRepository } from './cache-repository';

@Module({
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
