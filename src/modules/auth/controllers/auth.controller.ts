/* 
TODO: JWT SIMPLES - Controller de Autenticação:

1. IMPLEMENTAR APENAS O BÁSICO:
   - [ ] Implementar apenas POST /auth/login
   - [ ] Retornar apenas { access_token: string }
*/

import { Body, Controller, Post } from '@nestjs/common';
import type { LoginRequest } from '@/modules/auth/dto/login.dto';
import type { AuthResponseDto } from '../dto/auth.dto';
import type { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	SignIn(@Body() body: LoginRequest): AuthResponseDto {
		const { email, password } = body;

		return this.authService.SignIn(email, password);
	}
}
