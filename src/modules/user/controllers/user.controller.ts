import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type { AuthenticatedUserRequest, GetUserDto } from '../dto/get-user.dto';
import { UserService } from '../services/user.service';

@Controller('/accounts')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	async getUserProfile(
		@Request() req: AuthenticatedUserRequest,
	): Promise<GetUserDto> {
		const userId = req.user.userId;

		return await this.userService.getProfile(userId);
	}
}
