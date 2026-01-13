import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from '@/infra/auth/auth.service';
import { type SignUpDto } from '@/shared/dto/auth/signUp.dto';
import { type SignInDto } from '@/shared/dto/auth/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Cadastro',
    description: 'usuário informa os dados de cadastro',
  })
  @ApiBody({
    description: 'Dados necessários para cadastro',
    examples: {
      paciente: {
        summary: 'Paciente',
        value: {
          name: 'Exemplo Paciente',
          email: 'paciente@acme.com',
          password: '12345678',
          birthDate: '1990-01-01T00:00:00.000Z',
          role: 'PATIENT',
          documentType: 'CPF',
          document: '123.456.789-00',
        },
      },
    },
  })
  @ApiConflictResponse({
    description:
      'Se tentar se cadastrar com credenciais que já existem retorna 409',
    schema: {
      example: { statusCode: 409, message: 'Credentials already in use' },
    },
  })
  @ApiBadRequestResponse({
    description: 'Campos obrigatórios ausentes ou inválidos',
    schema: {
      example: {
        statusCode: 400,
        message: 'Required fields not provided',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Ao se cadastrar com sucesso retorna 201',
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
  signUp(@Body() body: SignUpDto) {
    return this.authService.SignUp(body);
  }

  @Post('signin')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Login',
    description: 'Usuário loga com os dados validados via token JWT',
  })
  @ApiBody({
    description: 'Dados necessários para login',
    examples: {
      paciente: {
        summary: 'Login paciente',
        value: {
          email: 'paciente@acme.com',
          password: '12345678',
        },
      },
      profissional: {
        summary: 'Login profissional',
        value: {
          email: 'profissional@acme.com',
          password: '12345678',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciais inválidas',
    schema: {
      example: { statusCode: 401, message: 'Invalid credentials' },
    },
  })
  @ApiBadRequestResponse({
    description: 'Ao se logar sem enviar dados retorna 400',
    schema: {
      example: {
        statusCode: 400,
        message: 'Required fields not provided',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Ao se logar com sucesso retorna 201',
    schema: {
      example: {
        accessToken: 'jwt.token.aqui',
      },
    },
  })
  signIn(@Body() body: SignInDto) {
    return this.authService.SignIn(body);
  }
}
