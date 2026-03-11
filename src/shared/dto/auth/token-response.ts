import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  accessToken!: string;
}

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
