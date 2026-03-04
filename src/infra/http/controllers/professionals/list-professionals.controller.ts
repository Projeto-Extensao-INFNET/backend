import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Roles } from '@/shared/decorators/roles.decorator';
import type { ROLE } from '@/shared/types';
import { ListProfessionalsService } from '@/domain/services/professionals/list-professionals.service';
import type { PaginationQueryDto } from '@/shared/dto/pagination/pagination.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUserProfileResponseClass } from '@/shared/dto/user/get-user.dto';

@Controller('/professionals')
@ApiTags('Professionals')
@ApiBearerAuth('authorization')
export class ListProfessionalsController {
  constructor(private readonly professionalService: ListProfessionalsService) {}

  @Roles('PATIENT' as ROLE)
  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List available professionals',
    operationId: 'listProfessionals',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of professionals',
    type: GetUserProfileResponseClass,
    isArray: true,
  })
  async listProfessionals(@Query() query: PaginationQueryDto) {
    return await this.professionalService.execute(query);
  }
}
