import type { EditProfileDto } from '@dtos/edit-profile.dto';
import type { AuthenticatedUserRequest } from '@dtos/get-user.dto';
import {
	Body,
	Controller,
	HttpCode,
	Patch,
	Request,
	UseGuards,
} from '@nestjs/common';
import { UserService } from '@services/user.service';
import { ROLE } from '@/_types';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

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
