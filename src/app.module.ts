import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/config/env';
import { PrismaModule } from '@/database/prisma/prisma.module';
import { ApplicationModule } from './application/application.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		PrismaModule,
		ApplicationModule,
	],
})
export class AppModule {}
