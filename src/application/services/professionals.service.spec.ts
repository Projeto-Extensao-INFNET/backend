import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/database/prisma/prisma.service';
import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository';
import { UserRepository } from '@/modules/user/repositories/user.repository';
import { MockPrismaService } from '@/test/mocks/prisma';
import { ProfessionalsService } from './professionals.service';

describe('ProfessionalService', () => {
	let service: ProfessionalsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProfessionalsService,
				{
					provide: UserRepository,
					useClass: PrismaUserRepository,
				},
				{
					provide: PrismaService,
					useValue: MockPrismaService,
				},
			],
		}).compile();

		service = module.get<ProfessionalsService>(ProfessionalsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	// TODO -> criar testes unitários
});
