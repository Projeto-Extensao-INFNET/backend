import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/infra/repositories/user.repository';

@Injectable()
export class ListProfessionalsService {
  constructor(private readonly userRepository: UserRepository) {}

  async listProfessionals() {
    return await this.userRepository.listProfessionals();
  }
}
