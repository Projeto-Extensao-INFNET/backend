import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { successResponse } from '@/shared/errors/responses/success.response';
import { EditProfileDto } from '@/infra/http/dtos/user/edit-profile.dto';
import { GetUserProfileResponse } from '@/infra/http/dtos/user/get-user.dto';
import { handleError } from '@/shared/errors/handleError';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { JwtAuthGuard } from '@/infra/auth/guards/auth.guard';

import type { RequestResponse } from '@/shared/errors/responses';
import type { AuthenticatedUserResponse } from '@/infra/http/dtos/auth/auth-user';

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
  ): Promise<RequestResponse<EditProfileDto>> {
    const userId = req.user.sub;

    const result = await this.editUserProfileService.execute(userId, dto);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value);
  }
}
