/**
 * CONTROLLERS
 */
import { DeleteUserController } from '@Controllers/user/delete-user.controller';
import { EditUserProfileController } from '@Controllers/user/edit-user-profile.controller';
import { GetProfessionalsController } from '@Controllers/professionals/get-professionals.controller';
import { GetUserController } from '@Controllers/user/get-user.controller';
import { SpecialtyController } from '@Controllers/specialty/specialty.controller';
import { TreatmentTypeController } from '@Controllers/treatment-type/treatment-type.controller';

/**
 *  MODULES
 */
import { Module } from '@nestjs/common';

/**
 * SERVICES
 */
import { ProfessionalsService } from '@Services/professionals/professionals.service';
import { SpecialtyService } from '@Services/specialty/specialty.service';
import { TreatmentTypeService } from '@Services/treatment-type/treatment-type.service';
import { UserService } from '@Services/user/user.service';

/**
 *  REPOSITORIES
 */
import { PrismaUserRepository } from '../repositories/prisma/prisma-user-repository';
import { UserRepository } from '../repositories/user.repository';

@Module({
  providers: [
    ProfessionalsService,
    SpecialtyService,
    TreatmentTypeService,
    UserService,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [
    DeleteUserController,
    EditUserProfileController,
    GetUserController,
    GetProfessionalsController,
    SpecialtyController,
    TreatmentTypeController,
  ],
})
export class HttpModule {}
