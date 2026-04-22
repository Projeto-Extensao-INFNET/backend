// Modules
import { Module } from '@nestjs/common';
import { CacheModule } from '@/infra/cache/cache.module';

// Controllers
import { UserController } from '@Controllers/user/user.controller';
import { ProfessionalsController } from './controllers/professionals/professionals.controller';
import { AppointmentsController } from '@Controllers/appointments/appointments.controller';
import { SpecialtyController } from '@Controllers/specialty/specialty.controller';
import { TreatmentTypeController } from '@Controllers/treatment-type/treatment-type.controller';
import { RefreshTokenController } from '@/infra/auth/controllers/refresh-token.controller';
import { LogoutController } from '../auth/controllers/logout.controller';
import { HealthController } from './controllers/health/health.controller';

// Services
import { UserService } from '@/application/services/user/user.service';
import { ProfessionalsService } from '@/application/services/professionals/professionals.service';
import { AppointmentsService } from '@/application/services/appointments/appointments.service';
import { SpecialtyService } from '@Services/specialty/specialty.service';
import { TreatmentTypeService } from '@Services/treatment-type/treatment-type.service';
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
    UserService,
    ProfessionalsService,
    AppointmentsService,
    SpecialtyService,
    TreatmentTypeService,
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
    UserController,
    ProfessionalsController,
    SpecialtyController,
    TreatmentTypeController,
    AppointmentsController,
    HealthController,
    RefreshTokenController,
    LogoutController,
  ],
})
export class HttpModule {}
