import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '@/application/services/user.service';
import { PrismaUserRepository } from './repositories/prisma/prisma-user-repository';
import { UserRepository } from './repositories/user.repository';

@Module({
	imports: [JwtModule],
	providers: [
		UserService,
		PrismaUserRepository,
		{
			provide: UserRepository, // injeta o repositório com os métodos abstratos
			useExisting: PrismaUserRepository, // implementa os métodos reais
		},
	],
	exports: [UserRepository, UserService],
})
export class UserModule {}
