import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { GetUserProfileResponse } from '@/shared/dto/user/get-user.dto';
import { GetUserProfileService } from '@/domain/services/user/get-user-profile.service';
import { JwtAuthGuard } from '../../../auth/auth.guard';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';

@Controller('/accounts')
export class GetUserProfileController {
  constructor(private readonly getUserProfileService: GetUserProfileService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getUserProfile(
    @Request() req: AuthenticatedUserResponse,
  ): Promise<GetUserProfileResponse> {
    const userId = req.user.userId;
    return await this.getUserProfileService.execute(userId);
  }
}
