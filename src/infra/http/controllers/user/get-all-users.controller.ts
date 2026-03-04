import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../auth/auth.guard';
import { GetAllUsersService } from '@/domain/services/user/get-all-users.service';
import type { ROLE } from '@/shared/types';
import type { PaginationQueryDto } from '@/shared/dto/pagination/pagination.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUserProfileResponseClass } from '@/shared/dto/user/get-user.dto';

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
    summary: 'Get all users (admin only)',
    operationId: 'getUsers',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: GetUserProfileResponseClass,
    isArray: true,
  })
  async getAllUsers(@Query() query: PaginationQueryDto) {
    return await this.getAllUsersService.execute(query);
  }
}
