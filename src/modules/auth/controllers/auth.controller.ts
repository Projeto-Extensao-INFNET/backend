import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { SignInDto } from '../dto/signIn.dto';
import type { SignUpDto } from '../dto/signUp.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@HttpCode(201)
	signUp(@Body() body: SignUpDto) {
		return this.authService.SignUp(body);
	}

	@Post('signin')
	@HttpCode(201)
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.SignIn(signInDto.email, signInDto.password);
	}
}
