import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '@/infra/auth/decorators/current-user.decorator';

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
    operationId: 'deleteUserProfile',
  })
  @ApiResponse({
    status: 204,
    description: 'User account deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUserProfile(
    @CurrentUser() req: AuthenticatedUserResponse,
  ): Promise<void> {
    const userId = req.user.userId;
    await this.deleteUserProfileService.execute(userId);
  }
}
