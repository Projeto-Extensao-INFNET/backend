import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';

import type { GetUserProfileResponse } from '@/infra/http/dtos/user/get-user.dto';
import { ok, type Result } from '@/shared/errors/result';

@Injectable()
export class GetUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(userId: string): Promise<Result<GetUserProfileResponse>> {
    const user = await this.repo.getProfile(userId);

    if (!user.ok) return user;

    return ok(user.value);
  }
}
