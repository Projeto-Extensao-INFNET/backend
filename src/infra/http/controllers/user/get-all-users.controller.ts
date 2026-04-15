import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@/infra/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';
import { GetAllUsersService } from '@Services/user/get-all-users.service';
import type { ROLE } from '@/shared/types';
import type { PaginationQueryDto } from '@/infra/http/dtos/pagination/pagination.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_USERS_NOT_FOUND,
} from '@/shared/errors';

@Controller('/accounts')
@ApiTags('Accounts')
@ApiBearerAuth('authorization')
export class GetAllUsersController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {}

  @Roles('ADMIN' as ROLE)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all users (paginated)',
    operationId: 'listUsers',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of users (paginated)',
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
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
  @ApiResponse({
    status: 404,
    description: ERROR_USERS_NOT_FOUND,
  })
  async getAllUsers(@Query() query: PaginationQueryDto) {
    return await this.getAllUsersService.execute(query);
  }
}
