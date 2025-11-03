import { Controller, Get, HttpCode } from '@nestjs/common';
import { Roles } from '@/core/shared/decorators/roles.decorator';
import { ROLE } from '@/core/shared/types';
import { ProfessionalsService } from '@Services/professionals/professionals.service';

@Controller('/accounts')
export class GetProfessionalsController {
  constructor(private readonly professionalService: ProfessionalsService) {}

  @Roles(ROLE.PATIENT)
  @Get('professionals')
  @HttpCode(200)
  async listProfessionals() {
    return await this.professionalService.listProfessionals();
  }
}
