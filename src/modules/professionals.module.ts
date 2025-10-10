import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProfessionalsService } from '@/application/services/professionals.service';
import { PrismaUserRepository } from '@/database/repositories/prisma/prisma-user-repository';
import { UserRepository } from '@/database/repositories/user.repository';
import { UserModule } from './user.module';

@Module({
	imports: [UserModule, JwtModule],
	providers: [
		PrismaUserRepository,
		{
			provide: UserRepository,
			useExisting: PrismaUserRepository,
		},
		ProfessionalsService,
	],
	exports: [ProfessionalsService, PrismaUserRepository, UserRepository],
})
export class ProfessionalsModule {}
