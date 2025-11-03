import { Controller, Get, HttpCode, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '@/core/shared/decorators/roles.decorator';
import type {
  AuthenticatedUserRequest,
  UserProfileDto,
} from '@/core/shared/dto/user/get-user.dto';
import { ROLE } from '@/core/shared/types';
import { UserService } from '@Services/user/user.service';
import { JwtAuthGuard } from '../../../auth/auth.guard';

@Controller('/accounts')
export class GetUserController {
  constructor(private readonly userService: UserService) {}

  @Roles(ROLE.PATIENT)
  @Get('me')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca o perfil do usuário',
    description: 'Retorna os dados do perfil do usuário logado',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário retornado com sucesso',
    schema: {
      example: {
        id: 'uuid-gerado',
        name: 'Exemplo Paciente',
        email: 'paciente@acme.com',
        role: 'PATIENT',
        birthDate: '1990-01-01T00:00:00.000Z',
        documentType: 'CPF',
        document: '123.456.789-00',
        createdAt: '2025-08-24T15:00:00.000Z',
        updatedAt: '2025-08-24T15:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: { example: { statusCode: 404, message: 'User not found' } },
  })
  @ApiUnauthorizedResponse({
    description: 'Usuário não autenticado ou sem permissão',
    schema: { example: { statusCode: 401, message: 'Unauthorized' } },
  })
  @UseGuards(JwtAuthGuard)
  async getUserProfile(
    @Request() req: AuthenticatedUserRequest,
  ): Promise<UserProfileDto> {
    const userId = req.user.userId;

    const user = await this.userService.getProfile(userId);

    const userProfile: UserProfileDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      birthDate: user.birthDate,
      documentType: user.documentType,
      document: user.document,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userProfile;
  }
}
