import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { GetTokens } from '../jwt/generate-jwt-tokens';
import { badRequest } from '@/shared/errors/exceptions/exceptions';
import { err, ok } from '@/shared/errors/result';

import type { Payload } from '@/shared/types';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly token: GetTokens,
  ) {}
  async exec(refreshToken: string) {
    // Decodifica o refreshToken recebido
    const payload: Payload = this.jwt.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    if (!payload) return err(badRequest());

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.refreshToken) return err(badRequest());

    // Compara o refreshToken recebido com o  salvo no banco
    const isRefreshTokenValid = await compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenValid) return err(badRequest());

    // Gera novo payload para o JWT
    const newPayload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };

    // Gera novos accessToken e refreshToken
    const tokens = await this.token.exec(newPayload);

    // Salva hash do novo refreshToken no banco
    const hashedRefreshToken = await hash(tokens.refreshToken, 8);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    return ok(tokens);
  }
}
