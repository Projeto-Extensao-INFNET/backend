import { MAX_FILE_SIZE } from '@/shared/constants';
import { AvatarUploadService } from '@/domain/services/upload-avatar/avatar-upload.service';
import { JwtAuthGuard } from '@/infra/auth/auth.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import type { ROLE } from '@/shared/types';
import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/accounts')
export class UploadAvatarController {
  constructor(private readonly service: AvatarUploadService) {}

  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'PATIENT', 'PROFESSIONAL' as ROLE)
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.CREATED)
  async exec(
    @Request() req: AuthenticatedUserResponse,
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
