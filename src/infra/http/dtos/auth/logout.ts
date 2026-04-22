import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutResponse {
  @ApiProperty({
    example: 'Logged out',
    description: 'Mensagem de logout bem-sucedido.',
  })
  @IsString()
  message!: string;
}
