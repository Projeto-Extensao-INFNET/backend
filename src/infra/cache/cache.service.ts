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
    const start = Date.now();
    const duration = Date.now() - start;

    const value = await this.cacheManager.get<T>(key);

    this.logger.debug({
      key,
      type: 'cache',
      status: value ? 'HIT' : 'MISS',
      duration,
    });

    return value;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
    this.logger.debug(`CACHE SET key=${key} ttl=${ttl}`);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
    this.logger.debug(`CACHE DEL key=${key}`);
  }
}
