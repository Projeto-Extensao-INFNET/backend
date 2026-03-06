// Controllers
import { DeleteUserProfileController } from '@Controllers/user/delete-user-profile.controller';
import { EditUserProfileController } from '@Controllers/user/edit-user-profile.controller';
import { UploadAvatarController } from './controllers/upload-avatar/upload-avatar.controller';
import { ListProfessionalsController } from '@/infra/http/controllers/professionals/list-professionals.controller';
import { GetUserProfileController } from '@Controllers/user/get-user-profile.controller';
import { GetAllUsersController } from './controllers/user/get-all-users.controller';
import { SpecialtyController } from '@Controllers/specialty/specialty.controller';
import { TreatmentTypeController } from '@Controllers/treatment-type/treatment-type.controller';
import { UpdateAppointmentsController } from '@Controllers/appointments/update-appointments.controller';
import { GetAppointmentsController } from '@Controllers/appointments/get-appointments.controller';
import { CreateAppointmentsController } from '@Controllers/appointments/create-appointments.controller';
import { CancelAppointmentsController } from '@Controllers/appointments/cancel-appointments.controller';
import { HealthController } from './controllers/health/health.controller';

// Modules
import { Module } from '@nestjs/common';
import { CacheModule } from '@/infra/cache/cache.module';

// Services
import { AvatarUploadService } from '@/domain/services/upload-avatar/avatar-upload.service';
import { ListProfessionalsService } from '@/domain/services/professionals/list-professionals.service';
import { SpecialtyService } from '@Services/specialty/specialty.service';
import { TreatmentTypeService } from '@Services/treatment-type/treatment-type.service';
import { DeleteUserProfileService } from '@/domain/services/user/delete-user-profile.service';
import { EditUserProfileService } from '@/domain/services/user/edit-user-profile.service';
import { GetUserProfileService } from '@/domain/services/user/get-user-profile.service';
import { GetAllUsersService } from '@/domain/services/user/get-all-users.service';
import { GetAppointmentsService } from '@/domain/services/appointments/get-appointments.service';
import { CreateAppointmentsService } from '@/domain/services/appointments/create-appointments.service';
import { UpdateAppointmentsService } from '@/domain/services/appointments/update-appointments.service';
import { CancelAppointmentsService } from '@Services/appointments/cancel-appointments.service';

// Repositories
import {
  IUserRepository,
  PrismaUserRepository,
} from '@/infra/database/repositories/prisma-user-repository';
import {
  IProfessionalsRepository,
  PrismaProfessionalsRepository,
} from '@/infra/database/repositories/prisma-professionals.repository';
import {
  IPrismaAppointmentsRepository,
  PrismaAppointmentsRepository,
} from '@/infra/database/repositories/prisma-appointments.repository';

@Module({
  imports: [CacheModule],
  providers: [
    AvatarUploadService,
    ListProfessionalsService,
    SpecialtyService,
    TreatmentTypeService,
    GetUserProfileService,
    GetAllUsersService,
    DeleteUserProfileService,
    EditUserProfileService,
    GetAppointmentsService,
    CancelAppointmentsService,
    CreateAppointmentsService,
    UpdateAppointmentsService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: IProfessionalsRepository,
      useClass: PrismaProfessionalsRepository,
    },
    {
      provide: IPrismaAppointmentsRepository,
      useClass: PrismaAppointmentsRepository,
    },
  ],
  controllers: [
    GetUserProfileController,
    GetAllUsersController,
    EditUserProfileController,
    DeleteUserProfileController,
    ListProfessionalsController,
    SpecialtyController,
    TreatmentTypeController,
    GetAppointmentsController,
    CreateAppointmentsController,
    UpdateAppointmentsController,
    CancelAppointmentsController,
    HealthController,
    UploadAvatarController,
  ],
})
export class HttpModule {}
