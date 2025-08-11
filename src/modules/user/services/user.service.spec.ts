import { faker } from '@faker-js/faker/locale/pt_BR';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

const createMockUserRepository = () => ({
	getProfile: vi.fn(),
	findById: vi.fn(),
	deleteAccount: vi.fn(),
});

describe('UserService', () => {
	let service: UserService;
	const mockUserRepository = createMockUserRepository();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: mockUserRepository,
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

		mockUserRepository.findById.mockResolvedValue({
			id: userId,
			name: faker.person.fullName(),
			email: faker.internet.email(),
		});

		mockUserRepository.deleteAccount.mockResolvedValue({ id: userId });

		await service.deleteAccount(userId);

		expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
		expect(mockUserRepository.deleteAccount).toHaveBeenCalledWith(userId);
	});

	it('it should throw NotFoundException when user not found', async () => {
		const userId = 'non-existent-id';

		mockUserRepository.findById.mockResolvedValue(null);

		await expect(service.deleteAccount(userId)).rejects.toThrow(
			new NotFoundException('User not found'),
		);
		expect(mockUserRepository.deleteAccount).not.toHaveBeenCalled();
	});
});
