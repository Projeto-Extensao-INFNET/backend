import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetUserProfileService } from '@Services/user/get-user-profile.service';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUserProfileResponse } from '@/infra/http/dtos/user/get-user.dto';
import { handleError } from '@/shared/errors/handleError';
import { successResponse } from '@/shared/errors/responses/success.response';

import type { RequestResponse } from '@/shared/errors/responses';
import type { AuthenticatedUserResponse } from '@/infra/http/dtos/auth/auth-user';

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
  @ApiResponse({ status: 404, description: 'RESOURCE_NOT_FOUND' })
  async getUserProfile(
    @Req() req: AuthenticatedUserResponse,
  ): Promise<RequestResponse<GetUserProfileResponse>> {
    const userId = req.user.sub;

    const result = await this.getUserProfileService.execute(userId);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value, HttpStatus.OK);
  }
}
