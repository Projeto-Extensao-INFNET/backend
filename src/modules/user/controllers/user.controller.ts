import {
	Controller,
	Delete,
	Get,
	HttpCode,
	Request,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ROLE } from '@/_types';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type {
	AuthenticatedUserRequest,
	UserProfileDto,
} from '../dto/get-user.dto';
import { UserService } from '../services/user.service';

@Controller('/accounts')
export class UserController {
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
		return await this.userService.getProfile(userId);
	}

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

	@Roles(ROLE.PATIENT)
	@Get('professionals')
	@HttpCode(200)
	async listProfessionals() {
		return await this.userService.listProfessionals();
	}
}
