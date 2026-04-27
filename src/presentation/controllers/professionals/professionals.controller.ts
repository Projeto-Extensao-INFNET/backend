import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ProfessionalsService } from '@Services/professionals/professionals.service';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Roles } from '@/infra/auth/decorators/roles.decorator';
import { successResponse } from '@/shared/errors/responses/success.response';

import type { ROLE } from '@/shared/types';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/presentation/dtos/pagination/pagination.dto';
import type { RequestResponse } from '@/shared/errors/responses';
import type { ProfessionalModel } from '@/domain/models/professional.model';
import { handleError } from '@/shared/errors/handleError';

@Controller('/professionals')
@ApiTags('Professionals')
@ApiBearerAuth('authorization')
export class ProfessionalsController {
  constructor(private readonly service: ProfessionalsService) {}

  @Roles('PATIENT' as ROLE)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List available professionals',
    operationId: 'listProfessionals',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas!' })
  @ApiResponse({
    status: 200,
    description: 'List of professionals (paginated)',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              birthDate: { type: 'string', format: 'date-time' },
              avatar: { type: 'string' },
              role: { type: 'string' },
              document: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total_items: { type: 'number' },
            total_pages: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
          },
        },
      },
    },
  })
  async listProfessionals(
    @Query() query: PaginationQueryDto,
  ): Promise<RequestResponse<PaginationResultDto<ProfessionalModel>>> {
    const result = await this.service.listProfessionals(query);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value, HttpStatus.OK);
  }
}
