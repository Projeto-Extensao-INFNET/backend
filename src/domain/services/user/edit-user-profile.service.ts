import { EditProfileDto } from '@/core/dto/user/edit-profile.dto';
import { IUserRepository } from '@/core/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import type { GetUserProfileDto } from '@/core/dto/user/get-user.dto';

@Injectable()
export class EditUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async editProfile(
    id: string,
    dto: EditProfileDto,
  ): Promise<Omit<GetUserProfileDto, 'password'>> {
    await this.repo.findById(id);

    const updatedUser = await this.repo.editProfile(id, dto);

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
