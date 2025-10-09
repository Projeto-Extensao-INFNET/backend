import {
	Body,
	Controller,
	HttpCode,
	Patch,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ROLE } from '@/_types';
import { UserService } from '@/application/services/user.service';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type { EditProfileDto } from '../dto/edit-profile.dto';
import type { AuthenticatedUserRequest } from '../dto/get-user.dto';

@Controller('/accounts')
export class EditUserProfileController {
	constructor(private readonly userService: UserService) {}

	@Roles(ROLE.PATIENT)
	@UseGuards(JwtAuthGuard)
	@Patch('me')
	@HttpCode(200)
	async editProfile(
		@Request() req: AuthenticatedUserRequest,
		@Body() dto: EditProfileDto,
	) {
		const userId = req.user.userId;
		return await this.userService.editProfile(userId, dto);
	}
}
