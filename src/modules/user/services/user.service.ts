import { Injectable, NotFoundException } from '@nestjs/common';
import type { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getProfile(userId: string): Promise<Omit<UserEntity, 'password'>> {
		const user = await this.userRepository.getProfile(userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		// biome-ignore lint/correctness/noUnusedVariables: don't need use this variable
		const { password, ...userWithoutPassword } = user; // não exibe a senha o listar os dados do usuário
		return userWithoutPassword;
	}
	async editProfile() {}
	async deleteAccount(id: string): Promise<void> {
		const userExists = await this.userRepository.findById(id);

		if (!userExists) {
			throw new NotFoundException('User not found');
		}

		await this.userRepository.deleteAccount(id);
	}
	async createAppointment() {}
	async getAppointments() {}
	async changeAppointment() {}
	async cancelAppointment() {}
}
