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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { successResponse } from '@/shared/errors/responses/success.response';
import { handleError } from '@/shared/errors/handleError';

import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/infra/http/dtos/pagination/pagination.dto';
import type { ROLE } from '@/shared/types';
import type { UserModel } from '@/domain/models/user.model';
import type { RequestResponse } from '@/shared/errors/responses';

@Controller('/accounts')
@ApiTags('Accounts')
@ApiBearerAuth('authorization')
export class GetAllUsersController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {}

  @Roles('ADMIN' as ROLE)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiOperation({
    summary: 'Get all users (paginated)',
    operationId: 'listUsers',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users (paginated)',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas!' })
  @ApiResponse({
    status: 404,
    description: 'Recurso não encontrado!',
  })
  async getAllUsers(
    @Query() query: PaginationQueryDto,
  ): Promise<
    RequestResponse<PaginationResultDto<Omit<UserModel, 'password'>>>
  > {
    const result = await this.getAllUsersService.execute(query);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value, HttpStatus.OK);
  }
}
