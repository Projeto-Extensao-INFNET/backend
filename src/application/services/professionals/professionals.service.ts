import { IProfessionalsRepository } from '@/infra/database/prisma/repositories/prisma-professionals.repository';
import type { Professional } from '@/infra/database/prisma/generated/client';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/presentation/dtos/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import { ok, type Result } from '@/shared/errors/result';

@Injectable()
export class ProfessionalsService {
  constructor(private readonly repo: IProfessionalsRepository) {}

  async listProfessionals(
    query: PaginationQueryDto,
  ): Promise<Result<PaginationResultDto<Professional>>> {
    const users = await this.repo.listProfessionals(query);
    if (!users.ok) return users;
    return ok(users.value);
  }
}
