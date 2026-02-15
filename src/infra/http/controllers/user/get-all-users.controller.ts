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

@Controller('/accounts')
export class GetAllUsersController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {}

  @Roles('ADMIN' as ROLE)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Query() query: PaginationQueryDto) {
    return await this.getAllUsersService.execute(query);
  }
}
