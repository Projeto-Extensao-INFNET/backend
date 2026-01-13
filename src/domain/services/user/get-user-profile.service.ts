import { Injectable, NotFoundException } from '@nestjs/common';
import type { GetUserProfileDto } from '@/shared/dto/user/get-user.dto';
import { IUserRepository } from '@/core/repositories/prisma-user-repository';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';

@Injectable()
export class GetUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async getUserProfile(userId: string): Promise<GetUserProfileDto> {
    const user = await this.repo.getProfile(userId);

    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }

    return user;
  }
}
