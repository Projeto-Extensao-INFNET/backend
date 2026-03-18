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
    example: 'jwt-access-token',
    description: 'JWT token de acesso.',
  })
  accessToken!: string;

  @ApiProperty({
    example: 'jwt-refresh-token',
    description: 'JWT token de refresh.',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado.',
    example: {
      user: {
        username: 'user@example.com',
        sub: 'uuid',
        role: 'ADMIN',
      },
    },
  })
  data!: AuthenticatedUserResponse;
}
