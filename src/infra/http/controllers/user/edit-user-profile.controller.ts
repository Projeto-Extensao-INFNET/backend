import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { EditProfileDto } from '@/shared/dto/user/edit-profile.dto';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { JwtAuthGuard } from '@/infra/auth/auth.guard';

@Controller('/accounts')
export class EditUserProfileController {
  constructor(
    private readonly editUserProfileService: EditUserProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async editProfile(
    @Request() req: AuthenticatedUserResponse,
    @Body() dto: EditProfileDto,
  ) {
    const userId = req.user.userId;
    return await this.editUserProfileService.execute(userId, dto);
  }
}
