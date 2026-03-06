import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CacheModule } from '@/infra/cache/cache.module';

@Global()
@Module({
  imports: [CacheModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
