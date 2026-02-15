import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Roles } from '@/shared/decorators/roles.decorator';
import type { ROLE } from '@/shared/types';
import { ListProfessionalsService } from '@/domain/services/professionals/list-professionals.service';
import type { PaginationQueryDto } from '@/shared/dto/pagination/pagination.dto';

@Controller('/professionals')
export class ListProfessionalsController {
  constructor(private readonly professionalService: ListProfessionalsService) {}

  @Roles('PATIENT' as ROLE)
  @Get('')
  @HttpCode(HttpStatus.OK)
  async listProfessionals(@Query() query: PaginationQueryDto) {
    return await this.professionalService.execute(query);
  }
}
