import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '@/infra/auth/auth.service';
import { type SignUpDto } from '@/shared/dto/auth/signUp.dto';
import { type SignInDto } from '@/shared/dto/auth/signIn.dto';

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
  signIn(@Body() body: SignInDto) {
    return this.authService.SignIn(body);
  }
}
