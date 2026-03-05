import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.findById(id);

    await this.repo.deleteProfile(id);
  }
}
