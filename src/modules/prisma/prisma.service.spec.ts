import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
	let service: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true })],
			// Mock do PrismaService para evitar que o teste seja dependente do Docker estar rodando ou não
			providers: [
				{
					provide: PrismaService,
					useValue: {
						$connect: vi.fn(),
						$disconnect: vi.fn(),
						onModuleInit: PrismaService.prototype.onModuleInit,
						onModuleDestroy:
							PrismaService.prototype.onModuleDestroy,
					},
				},
			],
		}).compile();

		service = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should call $connect', async () => {
		await service.onModuleInit();

		expect(service.$connect).toHaveBeenCalledTimes(1);
	});
	it('should call $disconnect', async () => {
		await service.onModuleDestroy();

		expect(service.$disconnect).toHaveBeenCalledTimes(1);
	});
});
