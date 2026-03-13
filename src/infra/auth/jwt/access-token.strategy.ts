import { env } from '@/config/env';
import type { Payload } from '@/shared/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKey: env.JWT_SECRET,
      jwtFromRequest: (req) => {
        if (req.cookies?.accessToken) return req.cookies.accessToken;
        return null;
      },
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: Payload) {
    return payload;
  }
}
