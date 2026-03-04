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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('/accounts')
@ApiTags('Accounts')
@ApiBearerAuth('authorization')
export class DeleteUserProfileController {
  constructor(
    private readonly deleteUserProfileService: DeleteUserProfileService,
  ) {}

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete authenticated user account',
    operationId: 'deleteProfile',
  })
  @ApiResponse({
    status: 204,
    description: 'User account deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUserProfile(
    @Request() req: AuthenticatedUserResponse,
  ): Promise<void> {
    const userId = req.user.userId;
    await this.deleteUserProfileService.execute(userId);
  }
}
