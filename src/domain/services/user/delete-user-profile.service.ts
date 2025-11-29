import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/infra/repositories/user.repository';

@Injectable()
export class DeleteUserProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async deleteUserProfile(id: string): Promise<void> {
    await this.userRepository.findById(id);

    await this.userRepository.deleteProfile(id);
  }
}
