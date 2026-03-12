import { IsUUID, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { ROLE } from '@/shared/types';

class User {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  sub!: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  role!: ROLE;
}

export class AuthenticatedUserResponse {
  @ApiProperty({ type: User })
  user!: User;
}

export class AuthResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken!: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsOptional()
  refreshToken!: string;
}
