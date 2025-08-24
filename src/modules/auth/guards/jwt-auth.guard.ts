import {
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
	) {
		super();
	}

	async canActivate(context: ExecutionContext) {
		const canActivate = await super.canActivate(context);
		if (!canActivate) {
			return false;
		}

		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		const userRoles = user.role || [];
		const hasRole = () =>
			Array.isArray(userRoles)
				? userRoles.some((role) => requiredRoles.includes(role))
				: requiredRoles.includes(userRoles);

		if (!hasRole()) {
			throw new UnauthorizedException('Insufficient permissions');
		}

		return true;
	}
}
