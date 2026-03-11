import { env } from '@/config/env';
import { ERROR_INVALID_TOKEN_TYPE } from '@/shared/errors';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    if (payload.type !== 'access')
      throw new UnauthorizedException(ERROR_INVALID_TOKEN_TYPE);

    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
