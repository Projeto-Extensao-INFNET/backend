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
import { SignUpDto } from '@/infra/http/dtos/auth/signUp.dto';
import {
  SignInDto,
  SignInResponseDto,
} from '@/infra/http/dtos/auth/signIn.dto';
import { COOKIES_MAX_AGE } from '@/shared/constants';
import { env } from '@/config/env';

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
    schema: {
      example: {
        status: 201,
        message: 'Usuário criado com sucesso!',
        data: {
          id: 'uuid',
          name: 'John Doe',
          email: 'john@example.com',
          birthDate: '1990-01-01T00:00:00.000Z',
          role: 'PATIENT',
          documentType: 'CPF',
          document: '12345678901',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: ERROR_REQUIRED_FIELDS })
  @ApiResponse({ status: 409, description: ERROR_CREDENTIALS_IN_USE })
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authService.SignUp(body);
    return {
      status: HttpStatus.CREATED,
      message: `Usuário criado com sucesso!`,
      data: user,
    };
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
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, data } =
      await this.authService.SignIn(body);

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

    return {
      status: HttpStatus.CREATED,
      message: `Usuário logado com sucesso!`,
      data,
    };
  }
}
