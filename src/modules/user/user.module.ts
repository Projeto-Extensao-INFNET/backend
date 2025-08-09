import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
	imports: [PrismaModule],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
