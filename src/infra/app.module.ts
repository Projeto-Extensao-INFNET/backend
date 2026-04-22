import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';

import cookieParser from 'cookie-parser';

import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { AuthModule } from '../infra/auth/auth.module';
import { HttpModule } from '../infra/http/http.module';

@Module({
  imports: [PrismaModule, AuthModule, HttpModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
