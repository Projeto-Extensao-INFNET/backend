import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { ok, type Result } from '@/shared/errors/result';
import { Injectable } from '@nestjs/common';

import type { DeleteProfileResponseDto } from '@/infra/http/dtos/user/delete-profile.dto';

@Injectable()
export class DeleteUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string): Promise<Result<DeleteProfileResponseDto>> {
    const user = await this.repo.findById(id);
    if (!user.ok) return user;

    await this.repo.deleteProfile(id);

    return ok({ message: `Perfil ${user.value.id} removido com sucesso!` });
  }
}
