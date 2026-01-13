import { Controller, Get, HttpCode, Request, UseGuards } from '@nestjs/common';
import { Roles } from '@/shared/decorators/roles.decorator';
import type {
  AuthenticatedUserRequest,
  GetUserProfileDto,
} from '@/shared/dto/user/get-user.dto';
import type { ROLE } from '@/shared/types';
import { GetUserProfileService } from '@/domain/services/user/get-user-profile.service';
import { JwtAuthGuard } from '../../../auth/auth.guard';

@Controller('/accounts')
export class GetUserProfileController {
  constructor(private readonly getUserProfileService: GetUserProfileService) {}

  @Roles('PATIENT' as ROLE)
  @Get('me')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getUserProfile(
    @Request() req: AuthenticatedUserRequest,
  ): Promise<GetUserProfileDto> {
    return await this.getUserProfileService.getUserProfile(req.user.userId);
  }
}
