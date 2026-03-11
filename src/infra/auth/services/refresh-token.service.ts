import { PrismaService } from '@/infra/database/prisma/prisma.service';
import {
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION,
} from '@/shared/constants';
import {
  ERROR_INVALID_REFRESH_TOKEN,
  ERROR_INVALID_TOKEN_TYPE,
} from '@/shared/errors';
import { hashRefreshToken } from '@/utils';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async exec(refreshToken: string) {
    // verifica se o token é do tipo 'refresh'
    const payload = this.jwt.verify(refreshToken);

    if (payload.type !== 'refresh')
      throw new UnauthorizedException(ERROR_INVALID_TOKEN_TYPE);

    // busca o usuário que tem o refresh token
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
        refreshToken: hashRefreshToken(refreshToken),
      },
    });

    if (!user) throw new UnauthorizedException(ERROR_INVALID_REFRESH_TOKEN);

    // gera um novo payload
    const newPayload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };

    // gera um novo access token
    const newAccessToken = this.jwt.sign(
      {
        ...newPayload,
        type: 'access',
      },
      { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION },
    );

    // gera um novo refresh token
    const newRefreshToken = this.jwt.sign(
      {
        ...newPayload,
        type: 'refresh',
      },
      { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION },
    );

    // atualiza o usuário com o novo refresh token
    await this.prisma.user.update({
      where: { id: payload.sub },
      data: { refreshToken: hashRefreshToken(newRefreshToken) },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
