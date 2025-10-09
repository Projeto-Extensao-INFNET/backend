import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MockPrismaService } from '@/test/mocks/prisma';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
	let service: PrismaService;
	const mockPrismaService = MockPrismaService();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true })],
			providers: [
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<PrismaService>(PrismaService);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should call $connect', async () => {
		mockPrismaService.onModuleInit.mockImplementation(() => {
			mockPrismaService.$connect();
		});

		await service.onModuleInit();

		expect(service.$connect).toHaveBeenCalledTimes(1);
	});
	it('should call $disconnect', async () => {
		mockPrismaService.onModuleDestroy.mockImplementation(() => {
			mockPrismaService.$disconnect();
		});

		await service.onModuleDestroy();

		expect(service.$disconnect).toHaveBeenCalledTimes(1);
	});
});
