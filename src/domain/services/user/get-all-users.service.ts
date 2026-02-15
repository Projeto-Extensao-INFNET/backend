import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/core/repositories/prisma-user-repository';
import type { UserEntity } from '@/core/entities/user.entity';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/shared/dto/pagination/pagination.dto';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly repo: IUserRepository) {}

  async execute(
    query: PaginationQueryDto,
  ): Promise<PaginationResultDto<Omit<UserEntity, 'password'>>> {
    return this.repo.getAllUsers(query);
  }
}
