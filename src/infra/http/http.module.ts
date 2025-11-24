/**
 * CONTROLLERS
 */
import { DeleteUserProfileController } from '@Controllers/user/delete-user-profile.controller';
import { EditUserProfileController } from '@Controllers/user/edit-user-profile.controller';
import { ListProfessionalsController } from '@/infra/http/controllers/professionals/list-professionals.controller';
import { GetUserProfileController } from '@Controllers/user/get-user-profile.controller';
import { SpecialtyController } from '@Controllers/specialty/specialty.controller';
import { TreatmentTypeController } from '@Controllers/treatment-type/treatment-type.controller';
import { UpdateAppointmentsController } from '@Controllers/appointments/update-appointments.controller';
import { GetAppointmentsController } from '@Controllers/appointments/get-appointments.controller';
import { CreateAppointmentsController } from '@Controllers/appointments/create-appointments.controller';
import { CancelAppointmentsController } from '@Controllers/appointments/cancel-appointments.controller';

/**
 *  MODULES
 */
import { Module } from '@nestjs/common';

/**
 * SERVICES
 */
import { ListProfessionalsService } from '@/domain/services/professionals/list-professionals.service';
import { SpecialtyService } from '@Services/specialty/specialty.service';
import { TreatmentTypeService } from '@Services/treatment-type/treatment-type.service';
import { DeleteUserProfileService } from '@/domain/services/user/delete-user-profile.service';
import { EditUserProfileService } from '@/domain/services/user/edit-user-profile.service';
import { GetUserProfileService } from '@/domain/services/user/get-user-profile.service';
import { GetAppointmentsService } from '@/domain/services/appointments/get-appointments.service';
import { CreateAppointmentsService } from '@/domain/services/appointments/create-appointments.service';
import { UpdateAppointmentsService } from '@/domain/services/appointments/update-appointments.service';
import { CancelAppointmentsService } from '@Services/appointments/cancel-appointments.service';

/**
 *  REPOSITORIES
 */
import { PrismaUserRepository } from '../repositories/prisma/prisma-user-repository';
import { UserRepository } from '../repositories/user.repository';

@Module({
  providers: [
    ListProfessionalsService,
    SpecialtyService,
    TreatmentTypeService,
    GetUserProfileService,
    DeleteUserProfileService,
    EditUserProfileService,
    GetAppointmentsService,
    CancelAppointmentsService,
    CreateAppointmentsService,
    UpdateAppointmentsService,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [
    GetUserProfileController,
    EditUserProfileController,
    DeleteUserProfileController,
    ListProfessionalsController,
    SpecialtyController,
    TreatmentTypeController,
    GetAppointmentsController,
    CreateAppointmentsController,
    UpdateAppointmentsController,
    CancelAppointmentsController,
  ],
})
export class HttpModule {}
