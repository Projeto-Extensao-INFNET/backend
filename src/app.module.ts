import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		PrismaModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
