import { EditProfileDto } from '@/shared/dto/user/edit-profile.dto';
import { IUserRepository } from '@/core/repositories/prisma-user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EditUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string, dto: EditProfileDto): Promise<EditProfileDto> {
    await this.repo.findById(id);

    const updatedUser = await this.repo.editProfile(id, dto);

    return updatedUser;
  }
}
