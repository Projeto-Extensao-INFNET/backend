import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Roles } from '@/infra/auth/decorators/roles.decorator';
import type { ROLE } from '@/shared/types';
import { ListProfessionalsService } from '@Services/professionals/list-professionals.service';
import type { PaginationQueryDto } from '@/infra/http/dtos/pagination/pagination.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ERROR_INVALID_CREDENTIALS } from '@/shared/errors';

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
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
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
  async listProfessionals(@Query() query: PaginationQueryDto) {
    return await this.professionalService.execute(query);
  }
}
