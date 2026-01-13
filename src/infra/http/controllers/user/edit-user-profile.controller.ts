import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@/shared/decorators/roles.decorator';
import type { EditProfileDto } from '@/shared/dto/user/edit-profile.dto';
import type { AuthenticatedUserRequest } from '@/shared/dto/user/get-user.dto';
import type { ROLE } from '@/shared/types';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { JwtAuthGuard } from '@/infra/auth/auth.guard';

@Controller('/accounts')
export class EditUserProfileController {
  constructor(
    private readonly editUserProfileService: EditUserProfileService,
  ) {}

  @Roles('PATIENT' as ROLE)
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
