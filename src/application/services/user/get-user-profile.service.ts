import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';
import type { GetUserProfileResponse } from '@/infra/http/dtos/user/get-user.dto';

@Injectable()
export class GetUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(userId: string): Promise<GetUserProfileResponse> {
    const user = await this.repo.getProfile(userId);
    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }

    return user;
  }
}
