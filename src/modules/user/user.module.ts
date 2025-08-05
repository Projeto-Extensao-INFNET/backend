import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './controllers/user.controller';
import { ServicesService } from './services/user.service';

@Module({
	imports: [PrismaModule],
	providers: [ServicesService],
	controllers: [UserController],
})
export class UserModule {}
