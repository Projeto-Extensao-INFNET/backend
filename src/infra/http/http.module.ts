import { Module } from '@nestjs/common';

/**
 * CONTROLLERS
 */
import { AuthController } from '@controllers/auth.controller';
import { DeleteUserController } from '@controllers/delete-user.controller';
import { EditUserProfileController } from '@controllers/edit-user-profile.controller';
import { GetProfessionalsController } from '@controllers/get-professionals.controller';
import { GetUserController } from '@controllers/get-user.controller';
import { SpecialtyController } from '@controllers/specialty.controller';
import { TreatmentTypeController } from '@controllers/treatment-type.controller';

/**
 *  MODULES
 */
import { AuthModule } from '@/modules/auth.module';
import { ProfessionalsModule } from '@/modules/professionals.module';
import { SpecialtyModule } from '@/modules/specialty.module';
import { TreatmentTypeModule } from '@/modules/treatment-type.module';
import { UserModule } from '@/modules/user.module';
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
