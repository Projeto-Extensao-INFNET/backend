import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
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
  ): Promise<PaginationResultDto<Omit<UserModel, 'password'>>> {
    return this.repo.getAllUsers(query);
  }
}
