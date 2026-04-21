import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { successResponse } from '@/shared/errors/responses/success.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { handleError } from '@/shared/errors/handleError';
import { MAX_FILE_SIZE } from '@/shared/constants';
import { AvatarUploadService } from '@Services/upload-avatar/avatar-upload.service';
import { JwtAuthGuard } from '@/infra/auth/guards/auth.guard';
import { Roles } from '@/infra/auth/decorators/roles.decorator';

import type { RequestResponse } from '@/shared/errors/responses';
import type { AuthenticatedUserResponse } from '@/infra/http/dtos/auth/auth-user';
import type { ROLE } from '@/shared/types';

@ApiTags('Accounts')
@ApiBearerAuth('authorization')
@Controller('/accounts')
export class UploadAvatarController {
  constructor(private readonly service: AvatarUploadService) {}

  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'PATIENT', 'PROFESSIONAL' as ROLE)
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Upload avatar for authenticated user',
    operationId: 'uploadUserAvatar',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar file to upload (JPEG, PNG, JPG)',
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file',
        },
      },
      required: ['avatar'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Avatar uploaded successfully',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas!' })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity - file validation failed',
  })
  @ApiResponse({ status: 404, description: 'Recurso não encontrado!' })
  async exec(
    @Req() req: AuthenticatedUserResponse,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|png|jpg' })
        .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ): Promise<RequestResponse<string>> {
    const result = await this.service.exec(req, file);
    if (!result.ok) handleError(result.error);
    return successResponse('Sucesso ao enviar imagem', HttpStatus.OK);
  }
}
