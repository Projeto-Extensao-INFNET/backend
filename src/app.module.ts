import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/infra/database/prisma.module';
import { AuthModule } from './infra/auth/auth.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}
