import type { AuthenticatedUserResponse } from '@/infra/http/dtos/auth/auth-user';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
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

@Controller('/accounts')
@ApiTags('Accounts')
@ApiBearerAuth('authorization')
export class DeleteUserProfileController {
  constructor(
    private readonly deleteUserProfileService: DeleteUserProfileService,
  ) {}

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete authenticated user account',
    operationId: 'deleteUserProfile',
  })
  @ApiResponse({
    status: 200,
    description: 'User account deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Usuário removido com sucesso!' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUserProfile(@Req() req: AuthenticatedUserResponse) {
    await this.deleteUserProfileService.execute(req.user.sub);

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'Usuário removido com sucesso!',
    };
  }
}
