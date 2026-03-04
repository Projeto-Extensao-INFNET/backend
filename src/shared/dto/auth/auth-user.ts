import { IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username!: string;
}

export class AuthenticatedUserResponse {
  @ApiProperty({ type: User })
  user!: User;
}
