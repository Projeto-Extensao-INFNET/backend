import {
	Controller,
	Delete,
	Get,
	HttpCode,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ROLE } from '@/_types';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type {
	AuthenticatedUserRequest,
	UserProfileDto,
} from '../dto/get-user.dto';
import { UserService } from '../services/user.service';

@Controller('/accounts')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Roles(ROLE.PATIENT)
	@Get('me')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async getUserProfile(
		@Request() req: AuthenticatedUserRequest,
	): Promise<UserProfileDto> {
		const userId = req.user.userId;

		return await this.userService.getProfile(userId);
	}

	@Roles(ROLE.PATIENT)
	@Delete('me')
	@UseGuards(JwtAuthGuard)
	@HttpCode(204)
	async deleteUserProfile(
		@Request() req: AuthenticatedUserRequest,
	): Promise<void> {
		const userId = req.user.userId;

		await this.userService.deleteAccount(userId);
	}
}
