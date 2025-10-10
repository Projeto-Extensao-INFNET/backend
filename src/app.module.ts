import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from '@/application/application.module';
import { envSchema } from '@/config/env';
import { PrismaModule } from '@/database/prisma/prisma.module';

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
