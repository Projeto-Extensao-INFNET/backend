import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// export class DeleteProfileRequestDto {
//   @ApiProperty({ format: 'uuid', description: 'ID do usuário.' })
//   @IsUUID()
//   id!: string;
// }

export class DeleteProfileResponseDto {
  @ApiProperty({
    example: 'Perfil removido',
    required: true,
    description: 'Mensagem de deleção do perfil.',
  })
  @IsString()
  message!: string;
}
