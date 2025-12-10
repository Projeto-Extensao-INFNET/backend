import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@/core/repositories/user.repository';
import type { GetUserProfileDto } from '@/core/dto/user/get-user.dto';

@Injectable()
export class GetUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async getUserProfile(userId: string): Promise<GetUserProfileDto> {
    const user = await this.repo.getProfile(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
