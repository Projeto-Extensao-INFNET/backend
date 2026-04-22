import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, type OnModuleInit } from '@nestjs/common';

@Injectable()
export class CacheService implements OnModuleInit {
  private logger: Logger = new Logger('Redis');

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  onModuleInit() {
    this.logger.log('Redis Started!');
  }

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
