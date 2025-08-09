import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { GetUserDto } from '../dto/get-user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async getProfile(userId: string): Promise<GetUserDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				birthDate: true,
				role: true,
				documentType: true,
				document: true,
				createdAt: true,
				updatedAt: true,
				password: false,
			},
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}
	async editProfile() {}
	async deleteAccount() {}
	async createAppointment() {}
	async getAppointments() {}
	async changeAppointment() {}
	async cancelAppointment() {}
}
