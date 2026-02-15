import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';
import { JwtAuthGuard } from '../../../auth/auth.guard';

@Controller('/accounts')
export class DeleteUserProfileController {
  constructor(
    private readonly deleteUserProfileService: DeleteUserProfileService,
  ) {}

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserProfile(
    @Request() req: AuthenticatedUserResponse,
  ): Promise<void> {
    const userId = req.user.userId;
    await this.deleteUserProfileService.execute(userId);
  }
}
