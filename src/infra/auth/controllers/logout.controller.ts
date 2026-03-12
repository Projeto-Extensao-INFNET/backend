import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
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
import { LogoutResponse } from '@/shared/dto/auth/logout';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
@UseGuards(JwtAuthGuard)
export class LogoutController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Logout the current user',
    operationId: 'logout',
    description:
      'Invalidates the refresh token in the database and clears the refresh token cookie.',
  })
  @ApiResponse({
    status: 201,
    description: 'Logged out successfully',
    type: LogoutResponse,
  })
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: AuthenticatedUserResponse,
  ) {
    // limpa o refreshToken do banco
    await this.prisma.user.update({
      where: {
        id: req.user.sub,
      },
      data: {
        refreshToken: null,
      },
    });

    // limpa o refreshToken dos Cookies
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/auth/refresh',
    });

    return { message: 'Logged out' };
  }
}
