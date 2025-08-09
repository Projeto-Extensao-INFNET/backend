import { vi } from 'vitest';
import { PrismaService } from '../../src/modules/prisma/prisma.service';

const $connect = vi.fn();
const $disconnect = vi.fn();

const mockFindUnique = vi.fn();
const mockFindMany = vi.fn();
const mockCreate = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();

export const PrismaServiceMock = {
	provide: PrismaService,
	useValue: {
		$connect,
		$disconnect,
		onModuleInit: vi.fn().mockImplementation(() => $connect()),
		onModuleDestroy: vi.fn().mockImplementation(() => $disconnect()),

		user: {
			findUnique: mockFindUnique,
			findMany: mockFindMany,
			create: mockCreate,
			update: mockUpdate,
			delete: mockDelete,
		},

		professional: {
			findUnique: mockFindUnique,
			findMany: mockFindMany,
			create: mockCreate,
			update: mockUpdate,
			delete: mockDelete,
		},

		specialty: {
			findUnique: mockFindUnique,
			findMany: mockFindMany,
			create: mockCreate,
			update: mockUpdate,
			delete: mockDelete,
		},

		typesOfTreatment: {
			findUnique: mockFindUnique,
			findMany: mockFindMany,
			create: mockCreate,
			update: mockUpdate,
			delete: mockDelete,
		},
	},
};

export { mockFindUnique, mockFindMany, mockCreate, mockUpdate, mockDelete };
