import { vi } from 'vitest';
import { PrismaService } from '../../src/modules/prisma/prisma.service';

const $connect = vi.fn();
const $disconnect = vi.fn();

export const PrismaServiceMock = {
	provide: PrismaService,
	useValue: {
		$connect,
		$disconnect,
		onModuleInit: vi.fn().mockImplementation(() => $connect()),
		onModuleDestroy: vi.fn().mockImplementation(() => $disconnect()),
	},
};
