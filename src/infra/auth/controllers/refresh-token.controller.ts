import { ERROR_INVALID_REFRESH_TOKEN } from '@/shared/errors';
import {
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { RefreshTokenService } from '../services/refresh-token.service';
import { COOKIES_MAX_AGE } from '@/shared/constants';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token using the refresh token cookie',
    description:
      'Reads the refresh token from the HttpOnly cookie, validates it, and returns a new access token. A new refresh token is also set as a cookie.',
  })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401, description: ERROR_INVALID_REFRESH_TOKEN })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken)
      throw new UnauthorizedException(ERROR_INVALID_REFRESH_TOKEN);

    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshTokenService.exec(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/refresh',
      maxAge: COOKIES_MAX_AGE,
    });

    return { accessToken };
  }
}
