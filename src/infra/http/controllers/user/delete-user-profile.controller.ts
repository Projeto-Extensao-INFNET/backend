import {
  Controller,
  Delete,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@/shared/decorators/roles.decorator';
import type { AuthenticatedUserRequest } from '@/shared/dto/user/get-user.dto';
import type { ROLE } from '@/shared/types';
import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';
import { JwtAuthGuard } from '../../../auth/auth.guard';

@Controller('/accounts')
export class DeleteUserProfileController {
  constructor(
    private readonly deleteUserProfileService: DeleteUserProfileService,
  ) {}

  @Roles('PATIENT' as ROLE)
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async deleteUserProfile(
    @Request() req: AuthenticatedUserRequest,
  ): Promise<void> {
    const userId = req.user.userId;
    await this.deleteUserProfileService.deleteUserProfile(userId);
  }
}
