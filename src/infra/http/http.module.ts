import { Module } from '@nestjs/common';

/**
 *  MODULES
 */
import { AuthModule } from '@/modules/auth/auth.module';
import { ProfessionalsModule } from '@/modules/professionals/professionals.module';
import { SpecialtyModule } from '@/modules/specialty/specialty.module';
import { TreatmentTypeModule } from '@/modules/treatment-type/treatment-type.module';
import { UserModule } from '@/modules/user/user.module';

/**
 * CONTROLLERS
 */
import { AuthController } from './controllers/auth.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { EditUserProfileController } from './controllers/edit-user-profile.controller';
import { GetProfessionalsController } from './controllers/get-professionals.controller';
import { GetUserController } from './controllers/get-user.controller';
import { SpecialtyController } from './controllers/specialty.controller';
import { TreatmentTypeController } from './controllers/treatment-type.controller';

@Module({
	imports: [
		AuthModule,
		ProfessionalsModule,
		UserModule,
		SpecialtyModule,
		TreatmentTypeModule,
	],
	controllers: [
		AuthController,
		DeleteUserController,
		EditUserProfileController,
		GetUserController,
		GetProfessionalsController,
		SpecialtyController,
		TreatmentTypeController,
	],
})
export class HttpModule {}
