import { Injectable, NotFoundException } from '@nestjs/common';
import type { UserEntity } from '@/modules/user/entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class InMemoryUserRepository extends UserRepository {
	public items: UserEntity[] = [];

	async getProfile(userId: string): Promise<UserEntity> {
		const user = this.items.find((item) => item.id === userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async findById(id: string): Promise<UserEntity> {
		const user = this.items.find((item) => item.id === id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async deleteAccount(id: string): Promise<void> {
		const index = this.items.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundException('User not found');
		}

		this.items.splice(index, 1);
	}
}
