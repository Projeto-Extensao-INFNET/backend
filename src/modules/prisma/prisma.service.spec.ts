import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { vi } from 'vitest';

describe('PrismaService', () => {
	let service: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService],
		}).compile();

		service = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should call $connect', async () => {
		const spyConnect = vi.spyOn(service, '$connect');

		await service.onModuleInit();

		expect(spyConnect).toHaveBeenCalledTimes(1);
	});
	it('should call $disconnect', async () => {
		const spyConnect = vi.spyOn(service, '$disconnect');

		await service.onModuleDestroy();

		expect(spyConnect).toHaveBeenCalledTimes(1);
	});
});
