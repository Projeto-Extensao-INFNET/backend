import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/infra/auth/auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  ERROR_REQUIRED_FIELDS,
  ERROR_CREDENTIALS_IN_USE,
  ERROR_INVALID_CREDENTIALS,
} from '@/shared/errors';
import { type SignUpDto } from '@/shared/dto/auth/signUp.dto';
import { SignInDtoClass, type SignInDto } from '@/shared/dto/auth/signIn.dto';
import { AuthenticatedUserResponseClass } from '@/shared/dto/auth/auth-user';

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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        birthDate: { type: 'string', format: 'date' },
        role: {
          type: 'string',
          enum: ['PATIENT', 'PROFESSIONAL', 'ADMIN'],
        },
        documentType: {
          type: 'string',
          enum: ['CPF', 'RG'],
        },
        document: { type: 'string' },
      },
      required: [
        'name',
        'email',
        'password',
        'birthDate',
        'role',
        'documentType',
        'document',
      ],
    },
  })
  @ApiResponse({ status: 201, description: 'User created' })
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
  @ApiBody({ type: SignInDtoClass })
  @ApiResponse({
    status: 201,
    description: 'Authenticated',
    type: AuthenticatedUserResponseClass,
  })
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
  signIn(@Body() body: SignInDto) {
    return this.authService.SignIn(body);
  }
}
