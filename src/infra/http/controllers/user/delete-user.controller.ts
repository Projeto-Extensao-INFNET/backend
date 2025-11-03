import {
  Controller,
  Delete,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '@/core/shared/decorators/roles.decorator';
import type { AuthenticatedUserRequest } from '@/core/shared/dto/user/get-user.dto';
import { ROLE } from '@/core/shared/types';
import { UserService } from '@Services/user/user.service';
import { JwtAuthGuard } from '../../../auth/auth.guard';

@Controller('/accounts')
export class DeleteUserController {
  constructor(private readonly userService: UserService) {}

  @Roles(ROLE.PATIENT)
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleta o perfil do usuário',
    description: 'Deleta o perfil do usuário logado',
  })
  @ApiNoContentResponse({
    description: 'Retorna 204 quando deleta com sucesso',
  })
  @ApiNotFoundResponse({
    description:
      'Usuário não encontrado (se tentar deletar um usuário que não existe)',
    schema: { example: { statusCode: 404, message: 'User not found' } },
  })
  @ApiUnauthorizedResponse({
    description: 'Usuário não autenticado ou sem permissão',
    schema: { example: { statusCode: 401, message: 'Unauthorized' } },
  })
  async deleteUserProfile(
    @Request() req: AuthenticatedUserRequest,
  ): Promise<void> {
    const userId = req.user.userId;
    await this.userService.deleteAccount(userId);
  }
}
