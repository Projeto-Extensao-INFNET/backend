import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@/core/shared/decorators/roles.decorator';
import type { EditProfileDto } from '@/core/shared/dto/user/edit-profile.dto';
import type { AuthenticatedUserRequest } from '@/core/shared/dto/user/get-user.dto';
import { ROLE } from '@/core/shared/types';
import { UserService } from '@Services/user/user.service';
import { JwtAuthGuard } from '@/infra/auth/auth.guard';

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
