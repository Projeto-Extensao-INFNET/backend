import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { ok, type Result } from '@/shared/errors/result';

import type { UserModel } from '@/domain/models/user.model';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/infra/http/dtos/pagination/pagination.dto';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(
    query: PaginationQueryDto,
  ): Promise<Result<PaginationResultDto<Omit<UserModel, 'password'>>>> {
    const users = await this.repo.getAllUsers(query);
    if (!users.ok) return users;
    return ok(users.value);
  }
}
