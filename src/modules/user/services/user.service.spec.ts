import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { MockPrismaService } from '@/test/mocks/prisma';
import {
	generateBirthDate,
	generateUniqueDocument,
	generateUniqueEmail,
	generateUniqueName,
	generateUUID,
	nonExistentUserId,
} from '@/utils';
import { PrismaUserRepository } from '../repositories/prisma/prisma-user-repository';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;
	const mockPrismaService = MockPrismaService();

	const userMock = {
		id: generateUUID(),
		name: generateUniqueName(),
		email: generateUniqueEmail(),
		password: '12345678',
		birthDate: generateBirthDate(),
		role: 'PATIENT',
		documentType: 'CPF',
		document: generateUniqueDocument(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useClass: PrismaUserRepository,
				},
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	afterEach(async () => {
		vi.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getProfile', () => {
		it('should get user profile', async () => {
			const user = userMock;

			mockPrismaService.user.findUnique.mockResolvedValue(userMock);

			const result = await service.getProfile(user.id);

			expect(result).not.toHaveProperty('password');
			expect(result.id).toBe(user.id);
		});
		it('it should throw NotFoundException when user not found', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue(null);

			await expect(service.getProfile(nonExistentUserId)).rejects.toThrow(
				new NotFoundException('User not found'),
			);
		});
	});
	describe('deleteAccount ', () => {
		it('should delete user profile', async () => {
			const user = userMock;

			mockPrismaService.user.delete.mockResolvedValue(user);

			mockPrismaService.user.findUnique
				.mockResolvedValueOnce(user) // 1ª chamada: retorna o usuário
				.mockResolvedValueOnce(null); // 2ª chamada: retorna null

			await service.deleteAccount(user.id);

			const result = await mockPrismaService.user.findUnique({
				where: {
					id: user.id,
				},
			});

			expect(result).toBeNull();
		});

		it('it should throw NotFoundException when user not found', async () => {
			mockPrismaService.user.delete.mockRejectedValue(
				new NotFoundException('User not found'),
			);

			await expect(
				service.deleteAccount(nonExistentUserId),
			).rejects.toThrow(new NotFoundException('User not found'));
		});
	});
	// describe('createAppointment', () => {});
	// describe('getAppointments', () => {});
	// describe('changeAppointment', () => {});
	// describe('cancelAppointment', () => {});
});
