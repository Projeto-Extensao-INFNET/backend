import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetUserProfileService } from '@/domain/services/user/get-user-profile.service';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';
import { GetUserProfileResponse } from '@/shared/dto/user/get-user.dto';
import { CurrentUser } from '@/infra/auth/decorators/current-user.decorator';

@Controller('/accounts')
@ApiTags('Accounts')
@ApiBearerAuth('authorization')
export class GetUserProfileController {
  constructor(private readonly getUserProfileService: GetUserProfileService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get authenticated user profile',
    operationId: 'getUserProfile',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: GetUserProfileResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: ERROR_USER_NOT_FOUND })
  async getUserProfile(
    @CurrentUser() req: AuthenticatedUserResponse,
  ): Promise<GetUserProfileResponse> {
    const userId = req.user.userId;
    return await this.getUserProfileService.execute(userId);
  }
}
