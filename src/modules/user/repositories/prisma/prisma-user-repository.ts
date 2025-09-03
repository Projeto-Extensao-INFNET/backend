import { Injectable, NotFoundException } from '@nestjs/common';
import type { Professional } from 'generated/prisma';
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

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user as UserEntity;
	}

	async findById(id: string): Promise<UserEntity> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user as UserEntity;
	}

	async deleteAccount(id: string): Promise<void> {
		await this.prismaService.user.delete({
			where: {
				id,
			},
		});
	}

	async listProfessionals(): Promise<Professional[]> {
		const professionals = await this.prismaService.professional.findMany({
			select: {
				id: true,
				typeOfQuery: true,
				price: true,
				paymentMethod: true,
				document: true,
				documentType: true,
				gender: true,
				avatar: true,
				phone: true,
				userId: true,
				specialtyId: true,
				typeOfTreatmentId: true,
				user: {
					select: {
						name: true,
						email: true,
					},
				},
				specialty: {
					select: {
						name: true,
					},
				},
				typeOfTreatment: {
					select: {
						name: true,
					},
				},
			},
		});

		return professionals;
	}

	async editProfile(): Promise<UserEntity> {
		throw new Error('Implementar');
	}
}
