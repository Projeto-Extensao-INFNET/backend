export const MockPrismaService = () => ({
	$connect: vi.fn(),
	$disconnect: vi.fn(),
	onModuleInit: vi.fn(),
	onModuleDestroy: vi.fn(),
	user: {
		create: vi.fn(),
		createMany: vi.fn(),
		findUnique: vi.fn(),
		findMany: vi.fn(),
		update: vi.fn(),
		deleteMany: vi.fn(),
		delete: vi.fn(),
	},
	professional: {
		create: vi.fn(),
		createMany: vi.fn(),
		findUnique: vi.fn(),
		findMany: vi.fn(),
		update: vi.fn(),
		deleteMany: vi.fn(),
		delete: vi.fn(),
	},
});
