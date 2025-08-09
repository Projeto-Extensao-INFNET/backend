import { JwtService } from '@nestjs/jwt';
import { vi } from 'vitest';

// Mock do método sign do JwtService
const mockJwtSign = vi.fn();

export const JwtServiceMock = {
	provide: JwtService,
	useValue: {
		sign: mockJwtSign,
	},
};

// Export para usar nos testes
export { mockJwtSign };
