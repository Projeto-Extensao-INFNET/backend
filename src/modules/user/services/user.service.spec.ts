import { faker } from '@faker-js/faker/locale/pt_BR';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserService } from './user.service';

const createMockPrismaService = () => ({
	user: {
		findUnique: vi.fn(),
		findMany: vi.fn(),
		create: vi.fn(),
		delete: vi.fn(),
	},
});

describe('UserService', () => {
	let service: UserService;
	const mockPrismaService = createMockPrismaService();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get user profile', async () => {});
	it('should delete user profile', async () => {
		const userId = 'user-123';

		mockPrismaService.user.findUnique.mockResolvedValue({
			id: userId,
			name: faker.person.fullName(),
			email: faker.internet.email(),
		});

		mockPrismaService.user.delete.mockResolvedValue({ id: userId });

		await service.deleteAccount(userId);

		expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
			where: {
				id: userId,
			},
		});
		expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
			where: {
				id: userId,
			},
		});
	});

	it('it should throw NotFoundException when user not found', async () => {
		const userId = 'non-existent-id';

		mockPrismaService.user.findUnique.mockResolvedValue(null);

		await expect(service.deleteAccount(userId)).rejects.toThrow(
			new NotFoundException('User not found'),
		);
		expect(mockPrismaService.user.delete).not.toHaveBeenCalled();
	});
});
