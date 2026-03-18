import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { AuthenticatedUserResponse } from './auth-user';

export class SignInDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'E-mail do usuário.',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário.' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class SignInResponseDto {
  @ApiProperty({
    example: {
      accessToken: 'jwt-access-token',
      refreshToken: 'jwt-refresh-token',
    },
    description: 'JWT tokens de acesso e refresh.',
  })
  tokens!: {
    accessToken: string;
    refreshToken: string;
  };

  @ApiProperty({
    description: 'Dados do usuário autenticado.',
    example: {
      user: {
        username: 'user@example.com',
        email: 'user@example.com',
        sub: 'uuid',
        role: 'ADMIN',
      },
    },
  })
  data!: AuthenticatedUserResponse;
}
