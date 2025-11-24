import { Controller, Get, HttpCode } from '@nestjs/common';
import { Roles } from '@/core/shared/decorators/roles.decorator';
import { ROLE } from '@/core/shared/types';
import { ListProfessionalsService } from '@/domain/services/professionals/list-professionals.service';

@Controller('/accounts')
export class ListProfessionalsController {
  constructor(private readonly professionalService: ListProfessionalsService) {}

  @Roles(ROLE.PATIENT)
  @Get('professionals')
  @HttpCode(200)
  async listProfessionals() {
    return await this.professionalService.listProfessionals();
  }
}
