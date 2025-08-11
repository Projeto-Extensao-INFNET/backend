import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import type { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';

// implementação real do UserRepository usando o Prisma para acessar o banco de dados
@Injectable()
export class PrismaUserRepository extends UserRepository {
	constructor(private readonly prismaService: PrismaService) {
		super();
	}

	async getProfile(userId: string): Promise<UserEntity> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
		});

		return user as UserEntity;
	}

	async findById(id: string): Promise<UserEntity> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id,
			},
		});

		return user as UserEntity;
	}

	async deleteAccount(id: string): Promise<void> {
		await this.prismaService.user.delete({
			where: {
				id,
			},
		});
	}
}
