/* 
TODO: TESTES PARA AUTH SERVICE

BASEADO NO QUE O SERVICE VAI IMPLEMENTAR:
✅ SignIn(email, password) - método principal

QUANDO O SERVICE ESTIVER PRONTO, TESTAR:

1. TESTES UNITÁRIOS BÁSICOS:
   - [ ] should be defined (já existe)
   - [ ] SignIn com email válido e senha correta → deve retornar { access_token }
   - [ ] SignIn com email inexistente → deve throw UnauthorizedException
   - [ ] SignIn com senha errada → deve throw UnauthorizedException
   - [ ] SignIn sem email → deve throw error
   - [ ] SignIn sem senha → deve throw error

2. SETUP NECESSÁRIO:
   - [ ] Mock PrismaService
   - [ ] Mock JwtService  
   - [ ] Mock comparePassword utility
*/

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
