import { EditProfileDto } from '@/infra/http/dtos/user/edit-profile.dto';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { Injectable } from '@nestjs/common';
import { ok, type Result } from '@/shared/errors/result';

@Injectable()
export class EditUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(
    id: string,
    dto: EditProfileDto,
  ): Promise<Result<EditProfileDto>> {
    await this.repo.findById(id);

    const updatedUser = await this.repo.editProfile(id, dto);
    if (!updatedUser.ok) return updatedUser;

    return ok(updatedUser.value);
  }
}
