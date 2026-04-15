// Modules
import { Module } from '@nestjs/common';
import { CacheModule } from '@/infra/cache/cache.module';

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
import { RefreshTokenController } from '@/infra/auth/controllers/refresh-token.controller';
import { LogoutController } from '../auth/controllers/logout.controller';

// Services
import { AvatarUploadService } from '@Services/upload-avatar/avatar-upload.service';
import { ListProfessionalsService } from '@Services/professionals/list-professionals.service';
import { SpecialtyService } from '@Services/specialty/specialty.service';
import { TreatmentTypeService } from '@Services/treatment-type/treatment-type.service';
import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { GetUserProfileService } from '@Services/user/get-user-profile.service';
import { GetAllUsersService } from '@Services/user/get-all-users.service';
import { GetAppointmentsService } from '@Services/appointments/get-appointments.service';
import { CreateAppointmentsService } from '@Services/appointments/create-appointments.service';
import { UpdateAppointmentsService } from '@Services/appointments/update-appointments.service';
import { CancelAppointmentsService } from '@Services/appointments/cancel-appointments.service';
import { RefreshTokenService } from '@/infra/auth/services/refresh-token.service';

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

// Functions
import { GetTokens } from '../auth/jwt/generate-jwt-tokens';

@Module({
  imports: [CacheModule],
  providers: [
    GetTokens,
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
    RefreshTokenService,
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
    RefreshTokenController,
    LogoutController,
  ],
})
export class HttpModule {}
