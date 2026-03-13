import { IsUUID, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { ROLE } from '@/shared/types';

class User {
  @ApiProperty({ example: 'john_doe', description: 'Nome de usuário.' })
  @IsString()
  username!: string;

  @ApiProperty({ format: 'uuid', description: 'ID do usuário.' })
  @IsUUID()
  sub!: string;

  @ApiProperty({ example: 'ADMIN', description: 'Papel do usuário.' })
  @IsString()
  role!: ROLE;
}

export class AuthenticatedUserResponse {
  @ApiProperty({ type: User, description: 'Dados do usuário autenticado.' })
  user!: User;
}

export class AuthResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT de acesso.',
  })
  accessToken!: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT de refresh.',
  })
  @IsOptional()
  refreshToken!: string;
}
