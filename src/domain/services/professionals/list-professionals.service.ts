import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/core/repositories/user.repository';

@Injectable()
export class ListProfessionalsService {
  constructor(private readonly repo: IUserRepository) {}

  async listProfessionals() {
    return await this.repo.listProfessionals();
  }
}
