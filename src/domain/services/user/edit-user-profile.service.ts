import { UserEntity } from '@/core/entities/user.entity';
import { EditProfileDto } from '@dtos/user/edit-profile.dto';
import { UserRepository } from '@/infra/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EditUserProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async editProfile(
    id: string,
    dto: EditProfileDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    await this.userRepository.findById(id);

    const updatedUser = await this.userRepository.editProfile(id, dto);

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
