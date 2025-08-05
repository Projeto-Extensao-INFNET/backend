/* 
TODO: TESTES E2E PARA LOGIN

1. TESTES BÁSICOS:
   - [ ] Login com email e senha corretos → deve retornar token
   - [ ] Login com email errado → deve dar erro 401
   - [ ] Login com senha errada → deve dar erro 401
   - [ ] Login sem email → deve dar erro 400
   - [ ] Login sem senha → deve dar erro 400

2. SETUP NECESSÁRIO:
   - [ ] Importar AuthModule no teste
   - [ ] Configurar JwtModule
   - [ ] Usar banco de teste

*/

import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';

describe('AuthController (E2E)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	// Teste temporário para evitar erro "No test found in suite"
	it('should be defined', () => {
		expect(app).toBeDefined();
	});
});
