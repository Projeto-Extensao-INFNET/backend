import { IUserRepository } from '@/core/repositories/prisma-user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProfessionalsService {
  constructor(private readonly repo: IUserRepository) {}

  async listProfessionals() {
    return await this.repo.listProfessionals();
  }
}
