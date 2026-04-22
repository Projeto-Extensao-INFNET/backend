import { Controller, Post, Req, Res } from '@nestjs/common';
import { RefreshTokenService } from '../services/refresh-token.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { COOKIES_MAX_AGE } from '@/shared/constants';
import { env } from '@/config/env';
import { badRequest } from '@/shared/errors/exceptions/exceptions';
import { err } from '@/shared/errors/result';

// !!FIX [] => rota não funcionando retorna erro 500
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
  @ApiResponse({ status: 401, description: 'Credenciais inválidas!' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // busca o refreshToken e accessToken nos cookies da requisição
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return err(badRequest());

    // repassa o novo accessToken e refreshToken  para o service
    const result = await this.refreshTokenService.exec(refreshToken);
    if (!result.ok) return err(badRequest());

    const { value } = result;

    const isProd = env.NODE_ENV === 'production';

    // atualiza os cookies com o novo refreshToken e accessToken
    res.cookie('refreshToken', value.refreshToken, {
      httpOnly: true,
      path: '/auth/refresh',
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: COOKIES_MAX_AGE,
      domain: isProd ? 'FUTURO_DOMÍNIO_DE_PROD' : 'localhost',
    });

    return;
  }
}
