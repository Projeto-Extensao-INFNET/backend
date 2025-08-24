import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Env } from '@/config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService<Env, true>) {
		super({
			secretOrKey: config.getOrThrow('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
		});
		console.log('JwtStrategy instantiated');
	}

	async validate(payload: any) {
		return {
			userId: payload.sub,
			username: payload.username,
			role: payload.role,
		};
	}
}
