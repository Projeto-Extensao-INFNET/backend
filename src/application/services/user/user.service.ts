import { Injectable, Request } from '@nestjs/common';

import { IUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository';

import {
  badRequest,
  resourceNotFound,
} from '@/shared/errors/exceptions/exceptions';
import { err, ok, type Result } from '@/shared/errors/result';

import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/presentation/dtos/pagination/pagination.dto';
import type { GetUserProfileResponse } from '@/presentation/dtos/user/get-user.dto';
import type { EditProfileDto } from '@/presentation/dtos/user/edit-profile.dto';
import type { DeleteProfileResponseDto } from '@/presentation/dtos/user/delete-profile.dto';
import type { AuthenticatedUserResponse } from '@/presentation/dtos/auth/auth-user';
import type { OmittedUserPassword } from '@/shared/types';

@Injectable()
export class UserService {
  constructor(private readonly repo: IUserRepository) {}

  async getUsers(
    query: PaginationQueryDto,
  ): Promise<Result<PaginationResultDto<OmittedUserPassword>>> {
    const users = await this.repo.getAllUsers(query);
    if (!users.ok) return users;

    return ok(users.value);
  }

  async findById(id: string): Promise<Result<OmittedUserPassword>> {
    const user = await this.repo.findById(id);
    if (!user.ok) return user;
    return ok(user.value);
  }

  async getProfile(userId: string): Promise<Result<GetUserProfileResponse>> {
    const user = await this.repo.getProfile(userId);
    if (!user.ok) return user;

    return ok(user.value);
  }

  async uploadAvatar(
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

  async editProfile(
    id: string,
    dto: EditProfileDto,
  ): Promise<Result<EditProfileDto>> {
    await this.repo.findById(id);

    const updatedUser = await this.repo.editProfile(id, dto);
    if (!updatedUser.ok) return updatedUser;

    return ok(updatedUser.value);
  }

  async deleteProfile(id: string): Promise<Result<DeleteProfileResponseDto>> {
    const user = await this.repo.findById(id);
    if (!user.ok) return user;

    await this.repo.deleteProfile(id);

    return ok({ message: `Perfil ${user.value.id} removido com sucesso!` });
  }
}
