import { Module } from '@nestjs/common';
import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { AuthModule } from '../infra/auth/auth.module';
import { HttpModule } from '../infra/http/http.module';

@Module({
  imports: [PrismaModule, AuthModule, HttpModule],
})
export class AppModule {}
