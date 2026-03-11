import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { JwtAuthGuard } from '@/infra/auth/guards/auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { EditProfileDto } from '@/shared/dto/user/edit-profile.dto';
import { GetUserProfileResponse } from '@/shared/dto/user/get-user.dto';
import { CurrentUser } from '@/infra/auth/decorators/current-user.decorator';

@Controller('/accounts')
@ApiTags('Accounts')
@ApiBearerAuth('authorization')
export class EditUserProfileController {
  constructor(
    private readonly editUserProfileService: EditUserProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Edit authenticated user profile',
    operationId: 'updateUserProfile',
  })
  @ApiBody({
    description: 'User profile data to update',
    type: EditProfileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: GetUserProfileResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async editProfile(
    @CurrentUser() req: AuthenticatedUserResponse,
    @Body() dto: EditProfileDto,
  ) {
    const userId = req.user.userId;
    return await this.editUserProfileService.execute(userId, dto);
  }
}
