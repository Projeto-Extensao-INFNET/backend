import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';

import cookieParser from 'cookie-parser';

import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { AuthModule } from '../infra/auth/auth.module';
import { HttpModule } from '../presentation/http.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [PrismaModule, AuthModule, CacheModule, HttpModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
