import { Test, TestingModule } from '@nestjs/testing';
import { PrismaServiceMock } from '../../../../test/mocks/prismaService.mock';
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
});
