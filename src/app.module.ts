import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/config/env';
import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { ProfessionalsModule } from '@/modules/professionals/professionals.module';
import { SpecialtyModule } from '@/modules/specialty/specialty.module';
import { TreatmentTypeModule } from '@/modules/treatment-type/treatment-type.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		PrismaModule,
		UserModule,
		ProfessionalsModule,
		SpecialtyModule,
		TreatmentTypeModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
