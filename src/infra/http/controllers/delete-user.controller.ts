import type { AuthenticatedUserRequest } from '@dtos/get-user.dto';
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
import { UserService } from '@services/user.service';
import { ROLE } from '@/_types';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

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
