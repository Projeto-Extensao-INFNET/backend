import { faker } from '@faker-js/faker/locale/pt_BR';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
	mockDelete,
	mockFindUnique,
	PrismaServiceMock,
} from '../../../../test/mocks/prismaService.mock';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, PrismaServiceMock],
		}).compile();

		service = module.get<UserService>(UserService);

		vi.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get user profile', async () => {});
	it('should delete user profile', async () => {
		const userId = 'user-123';

		mockFindUnique.mockResolvedValue({
			id: userId,
			name: faker.person.fullName(),
			email: faker.internet.email(),
		});

		mockDelete.mockResolvedValue({ id: userId });

		await service.deleteAccount(userId);

		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				id: userId,
			},
		});
		expect(mockDelete).toHaveBeenCalledWith({
			where: {
				id: userId,
			},
		});
	});

	it('it should throw NotFoundException when user not found', async () => {
		const userId = 'non-existent-id';

		mockFindUnique.mockResolvedValue(null);

		await expect(service.deleteAccount(userId)).rejects.toThrow(
			new NotFoundException('User not found'),
		);
		expect(mockDelete).not.toHaveBeenCalled();
	});
});
