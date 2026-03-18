import {
  ERROR_INVALID_REFRESH_TOKEN,
  ERROR_INVALID_TOKEN_TYPE,
} from '@/shared/errors';
import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenService } from '../services/refresh-token.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    schema: {
      example: {
        status: 201,
        message: 'Refresh Token criado com sucesso!',
      },
    },
  })
  @ApiResponse({ status: 401, description: ERROR_INVALID_REFRESH_TOKEN })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // busca o refreshToken e accessToken nos cookies da requisição
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken)
      throw new UnauthorizedException(ERROR_INVALID_TOKEN_TYPE);

    // repassa o novo accessToken e refreshToken  para o service
    const { refreshToken: newRefreshToken } =
      await this.refreshTokenService.exec(refreshToken);

    const isProd = env.NODE_ENV === 'production';

    // atualiza os cookies com o novo refreshToken e accessToken
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/auth/refresh',
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: COOKIES_MAX_AGE,
      domain: isProd ? 'FUTURO_DOMÍNIO_DE_PROD' : 'localhost',
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Refresh Token criado com sucesso!',
    };
  }
}
