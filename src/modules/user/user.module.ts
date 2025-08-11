import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './controllers/user.controller';
import { PrismaUserRepository } from './repositories/prisma/prisma-user-repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
	imports: [PrismaModule],
	providers: [
		UserService,
		PrismaUserRepository,
		{
			provide: UserRepository,
			useExisting: PrismaUserRepository,
		},
	],
	controllers: [UserController],
})
export class UserModule {}
