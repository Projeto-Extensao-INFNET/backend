import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
	let service: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true })],
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
