import {
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION,
  JWT_SECRET,
} from '@/shared/constants';
import type { Payload } from '@/shared/types';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GetTokens {
  constructor(private readonly jwt: JwtService) {}

  async exec({ username, sub, role }: Payload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.sign(
        {
          sub,
          username,
          role,
        },
        {
          secret: JWT_SECRET,
          expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
        },
      ),

      this.jwt.sign(
        {
          sub,
          username,
          role,
        },
        {
          secret: JWT_REFRESH_SECRET,
          expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
