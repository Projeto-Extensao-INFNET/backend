import { Injectable } from '@nestjs/common';
import type { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getProfile(userId: string): Promise<Omit<UserEntity, 'password'>> {
		const user = await this.userRepository.getProfile(userId);

		const { password: _, ...userWithoutPassword } = user; // não exibe a senha o listar os dados do usuário
		return userWithoutPassword;
	}

	async deleteAccount(id: string): Promise<void> {
		await this.userRepository.findById(id);

		await this.userRepository.deleteAccount(id);
	}

	async editProfile() {}
	async createAppointment() {}
	async getAppointments() {}
	async changeAppointment() {}
	async cancelAppointment() {}
}
