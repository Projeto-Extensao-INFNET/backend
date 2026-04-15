import { IProfessionalsRepository } from '@/infra/database/repositories/prisma-professionals.repository';
import type { Professional } from '@/infra/database/prisma/generated/client';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/infra/http/dtos/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProfessionalsService {
  constructor(private readonly repo: IProfessionalsRepository) {}

  async execute(
    query: PaginationQueryDto,
  ): Promise<PaginationResultDto<Professional>> {
    return await this.repo.listProfessionals(query);
  }
}
