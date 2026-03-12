import { ERROR_INVALID_REFRESH_TOKEN } from '@/shared/errors';
import {
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenService } from '../services/refresh-token.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponse } from '@/shared/dto/auth/auth-user';
import type { Request, Response } from 'express';
import { COOKIES_MAX_AGE } from '@/shared/constants';
import { env } from '@/config/env';

@ApiTags('Auth')
@Controller('auth')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token using the refresh token cookie',
    operationId: 'refreshToken',
    description:
      'Reads the refresh token from the HttpOnly cookie, validates it, and returns a new access token. A new refresh token is also set as a cookie.',
  })
  @ApiResponse({
    status: 201,
    description: 'Token refreshed successfully',
    type: AuthResponse,
  })
  @ApiResponse({ status: 401, description: ERROR_INVALID_REFRESH_TOKEN })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // busca o refreshToken nos cookies da requisição
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken)
      throw new UnauthorizedException(ERROR_INVALID_REFRESH_TOKEN);

    // repassa o novo refreshToken para o service
    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshTokenService.exec(refreshToken);

    // atualiza os cookies com o novo refreshToken
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/refresh',
      secure: env.NODE_ENV === 'production',
      maxAge: COOKIES_MAX_AGE,
    });

    return { accessToken };
  }
}
