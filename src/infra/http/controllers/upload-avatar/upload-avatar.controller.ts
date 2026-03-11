import { MAX_FILE_SIZE } from '@/shared/constants';
import { AvatarUploadService } from '@/domain/services/upload-avatar/avatar-upload.service';
import { JwtAuthGuard } from '@/infra/auth/guards/auth.guard';
import { Roles } from '@/infra/auth/decorators/roles.decorator';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import type { ROLE } from '@/shared/types';
import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_USER_NOT_FOUND,
} from '@/shared/errors';
import { CurrentUser } from '@/infra/auth/decorators/current-user.decorator';

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
  @ApiResponse({ status: 401, description: ERROR_INVALID_CREDENTIALS })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity - file validation failed',
  })
  @ApiResponse({ status: 404, description: ERROR_USER_NOT_FOUND })
  async exec(
    @CurrentUser() req: AuthenticatedUserResponse,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|png|jpg' })
        .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    await this.service.exec(req, file);
  }
}
