import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';
import { successResponse } from '@/shared/errors/responses/success.response';
import { handleError } from '@/shared/errors/handleError';

import type { AuthenticatedUserResponse } from '@/infra/http/dtos/auth/auth-user';
import type { DeleteProfileResponseDto } from '../../dtos/user/delete-profile.dto';
import type { RequestResponse } from '@/shared/errors/responses';

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
  async deleteUserProfile(
    @Req() req: AuthenticatedUserResponse,
  ): Promise<RequestResponse<DeleteProfileResponseDto>> {
    const result = await this.deleteUserProfileService.execute(req.user.sub);
    if (!result.ok) handleError(result.error);

    return successResponse(
      { message: 'Perfil removido com sucesso!' },
      HttpStatus.NO_CONTENT,
    );
  }
}
