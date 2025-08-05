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

// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';

// describe('AuthController', () => {
// 	let controller: AuthController;

// 	beforeEach(async () => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			controllers: [AuthController],
// 		}).compile();

// 		controller = module.get<AuthController>(AuthController);
// 	});

// 	it('should be defined', () => {
// 		expect(controller).toBeDefined();
// 	});
// });
