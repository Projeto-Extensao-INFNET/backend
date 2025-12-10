import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@/core/shared/decorators/roles.decorator';
import type { EditProfileDto } from '@/core/dto/user/edit-profile.dto';
import type { AuthenticatedUserRequest } from '@/core/dto/user/get-user.dto';
import { ROLE } from '@/core/types';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { JwtAuthGuard } from '@/infra/auth/auth.guard';

@Controller('/accounts')
export class EditUserProfileController {
  constructor(
    private readonly editUserProfileService: EditUserProfileService,
  ) {}

  @Roles(ROLE.PATIENT)
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @HttpCode(200)
  async editProfile(
    @Request() req: AuthenticatedUserRequest,
    @Body() dto: EditProfileDto,
  ) {
    const userId = req.user.userId;
    return await this.editUserProfileService.editProfile(userId, dto);
  }
}
