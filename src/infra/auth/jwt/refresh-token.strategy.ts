import { env } from '@/infra/config/env';
import type { Payload } from '@/shared/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      secretOrKey: env.JWT_REFRESH_SECRET,
      // extrai o refreshToken dos cookies da requisição
      jwtFromRequest: (req) => req?.cookies?.refreshToken || null,
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: Payload) {
    return payload;
  }
}
