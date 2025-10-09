import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/user/repositories/user.repository';

@Injectable()
export class ProfessionalsService {
	constructor(private readonly userRepository: UserRepository) {}

	async listProfessionals() {
		return await this.userRepository.listProfessionals();
	}
}
