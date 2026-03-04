import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { JwtAuthGuard } from '@/infra/auth/auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import {
  EditProfileDtoClass,
  type EditProfileDto,
} from '@/shared/dto/user/edit-profile.dto';

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
    operationId: 'editProfile',
  })
  @ApiBody({ type: EditProfileDtoClass })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async editProfile(
    @Request() req: AuthenticatedUserResponse,
    @Body() dto: EditProfileDto,
  ) {
    const userId = req.user.userId;
    return await this.editUserProfileService.execute(userId, dto);
  }
}
