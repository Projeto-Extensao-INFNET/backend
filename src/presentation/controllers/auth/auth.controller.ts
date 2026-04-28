import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import {
  SignInDto,
  SignInResponseDto,
} from '@/presentation/dtos/auth/signIn.dto';
import {
  SignUpDto,
  SignUpResponseDto,
} from '@/presentation/dtos/auth/signUp.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { env } from '@/infra/config/env';
import { AuthService } from '@/application/services/auth/auth.service';
import { COOKIES_MAX_AGE } from '@/shared/constants';
import { successResponse } from '@/shared/errors/responses/success.response';
import { handleError } from '@/shared/errors/handleError';

import type { Response } from 'express';
import type { RequestResponse } from '@/shared/errors/responses';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user account',
    operationId: 'signUp',
    description: 'Cria um novo usuário e retorna os dados do usuário criado.',
  })
  @ApiBody({
    type: SignUpDto,
    description: 'Dados necessários para criar um novo usuário.',
  })
  @ApiResponse({
    status: 201,
    description:
      'User created successfully. Retorna os dados do usuário criado.',
    type: SignUpResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida! Os campos estão incorretos',
  })
  @ApiResponse({ status: 409, description: 'Credenciais já em uso!' })
  async signUp(
    @Body() body: SignUpDto,
  ): Promise<RequestResponse<SignUpResponseDto>> {
    const result = await this.authService.SignUp(body);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value, HttpStatus.CREATED);
  }

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Authenticate and receive access token',
    operationId: 'signIn',
  })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 201,
    description: 'Authenticated successfully',
    type: SignInResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas!' })
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RequestResponse<SignInResponseDto>> {
    const result = await this.authService.SignIn(body);
    if (!result.ok) return handleError(result.error);

    const { accessToken, refreshToken } = result.value;

    const isProd = env.NODE_ENV === 'production';

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/auth/refresh',
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: COOKIES_MAX_AGE,
      domain: isProd ? 'FUTURO_DOMÍNIO_DE_PROD' : 'localhost',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      path: '/auth/refresh',
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: COOKIES_MAX_AGE,
      domain: isProd ? 'FUTURO_DOMÍNIO_DE_PROD' : 'localhost',
    });

    return successResponse(result.value, HttpStatus.CREATED);
  }
}
