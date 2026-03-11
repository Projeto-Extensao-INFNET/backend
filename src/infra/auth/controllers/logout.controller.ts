import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { JwtAuthGuard } from '../guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ERROR_INVALID_CREDENTIALS } from '@/shared/errors';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
@UseGuards(JwtAuthGuard)
export class LogoutController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('logout')
  @ApiOperation({
    summary: 'Logout the current user',
    description:
      'Invalidates the refresh token in the database and clears the refresh token cookie.',
  })
  @ApiResponse({ status: 201, description: 'Logged out' })
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
  async logout(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() req: AuthenticatedUserResponse,
  ) {
    await this.prisma.user.update({
      where: {
        id: req.user.userId,
      },
      data: {
        refreshToken: null,
      },
    });

    res.clearCookie('refreshToken', { path: '/refresh' });

    return { message: 'Logged out' };
  }
}
