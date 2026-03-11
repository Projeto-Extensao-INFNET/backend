import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from '@/infra/auth/services/auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  ERROR_REQUIRED_FIELDS,
  ERROR_CREDENTIALS_IN_USE,
  ERROR_INVALID_CREDENTIALS,
} from '@/shared/errors';
import { SignUpDto, SignUpResponseDto } from '@/shared/dto/auth/signUp.dto';
import { SignInDto } from '@/shared/dto/auth/signIn.dto';
import { TokenResponse } from '@/shared/dto/auth/token-response';
import { COOKIES_MAX_AGE } from '@/shared/constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user account',
    operationId: 'SignUp',
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: SignUpResponseDto,
  })
  @ApiResponse({ status: 400, description: ERROR_REQUIRED_FIELDS })
  @ApiResponse({ status: 409, description: ERROR_CREDENTIALS_IN_USE })
  signUp(@Body() body: SignUpDto) {
    return this.authService.SignUp(body);
  }

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Authenticate and receive access token',
    operationId: 'SignIn',
  })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 201,
    description: 'Authenticated successfully',
    type: TokenResponse,
  })
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.SignIn(body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/refresh',
      secure: true,
      maxAge: COOKIES_MAX_AGE,
    });

    return { accessToken };
  }
}
