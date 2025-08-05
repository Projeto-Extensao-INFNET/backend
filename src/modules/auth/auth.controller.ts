/* 
TODO: JWT SIMPLES - Controller de Autenticação:

1. IMPLEMENTAR APENAS O BÁSICO:
   - [ ] Implementar apenas POST /auth/login
   - [ ] Retornar apenas { access_token: string }
*/

// import { Body, Controller, Post } from '@nestjs/common';
// import type { authBodySchema } from '@/schemas/AuthBodySchema';
// import type { AuthResponseDto } from './auth.dto';
// import type { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
// 	constructor(private readonly authService: AuthService) {}

// 	@Post('login')
// 	SignIn(@Body() body: authBodySchema): AuthResponseDto {
// 		const { email, password } = body;

// 		return this.authService.SignIn(email, password);
// 	}
// }
