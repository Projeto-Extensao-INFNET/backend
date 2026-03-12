import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
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
    @Req() req: AuthenticatedUserResponse,
    @Body() dto: EditProfileDto,
  ) {
    const userId = req.user.sub;
    return await this.editUserProfileService.execute(userId, dto);
  }
}
