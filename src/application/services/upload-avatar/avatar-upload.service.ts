import { Injectable, Request } from '@nestjs/common';

import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';

import {
  badRequest,
  resourceNotFound,
} from '@/shared/errors/exceptions/exceptions';
import { err, ok, type Result } from '@/shared/errors/result';

import type { AuthenticatedUserResponse } from '@/infra/http/dtos/auth/auth-user';

@Injectable()
export class AvatarUploadService {
  constructor(private readonly repo: IUserRepository) {}
  async exec(
    @Request() req: AuthenticatedUserResponse,
    avatarFile: Express.Multer.File,
  ): Promise<Result<string>> {
    const userId = req.user.sub;

    if (!avatarFile) return err(badRequest('Arquivo do avatar é obrigatório'));

    const userExists = await this.repo.findById(userId);
    if (!userExists) return err(resourceNotFound('Usuário não encontrado'));

    const convertAvatarToBase64 = avatarFile.buffer.toString('base64');
    const avatarUrlData = `data:${avatarFile.mimetype};base64,${convertAvatarToBase64}`;

    await this.repo.uploadAvatar(userId, avatarUrlData);

    return ok('Imagem de perfil enviada com sucesso!');
  }
}
