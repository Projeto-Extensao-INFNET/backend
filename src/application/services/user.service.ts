import { Injectable } from '@nestjs/common';
import type { UserEntity } from '@/core/entities/user.entity';
import type { EditProfileDto } from '@/infra/http/dto/edit-profile.dto';
import { UserRepository } from '@/modules/user/repositories/user.repository';

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

	async editProfile(
		id: string,
		dto: EditProfileDto,
	): Promise<Omit<UserEntity, 'password'>> {
		await this.userRepository.findById(id);

		const updatedUser = await this.userRepository.editProfile(id, dto);

		const { password: _, ...userWithoutPassword } = updatedUser;
		return userWithoutPassword;
	}
	async createAppointment() {}
	async getAppointments() {}
	async changeAppointment() {}
	async cancelAppointment() {}
}
