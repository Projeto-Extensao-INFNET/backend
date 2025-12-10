import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/core/repositories/user.repository';

@Injectable()
export class DeleteUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async deleteUserProfile(id: string): Promise<void> {
    await this.repo.findById(id);

    await this.repo.deleteProfile(id);
  }
}
