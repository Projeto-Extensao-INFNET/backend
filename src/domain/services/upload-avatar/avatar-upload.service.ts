import { IUserRepository } from '@/core/repositories/prisma-user-repository';
import type { AuthenticatedUserResponse } from '@/shared/dto/auth/auth-user';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';
import { Injectable, NotFoundException, Request } from '@nestjs/common';

@Injectable()
export class AvatarUploadService {
  constructor(private readonly repo: IUserRepository) {}

  async exec(
    @Request() req: AuthenticatedUserResponse,
    avatarFile: Express.Multer.File,
  ): Promise<void> {
    const userId = req.user.userId;

    if (!avatarFile) {
      // TODO - lançar erro
    }

    const userExists = await this.repo.findById(userId);
    if (!userExists) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }

    const convertAvatarToBase64 = avatarFile.buffer.toString('base64');
    const avatarUrlData = `data:${avatarFile.mimetype};base64,${convertAvatarToBase64}`;

    await this.repo.uploadAvatar(userId, avatarUrlData);
  }
}
