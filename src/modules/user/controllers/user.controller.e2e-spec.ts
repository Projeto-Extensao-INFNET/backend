import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { hashPassword } from '@/utils';

// describe('User (E2E)', () => {
//  let app: INestApplication;
//  let prisma: PrismaService;

//  beforeAll(async () => {
//  	const moduleRef = await Test.createTestingModule({
//  		imports: [AppModule],
//  	}).compile();

//  	app = moduleRef.createNestApplication();

//  	prisma = moduleRef.get(PrismaService);

//  	await app.init();
//  });

//  it('[POST] /accounts', async () => {
//  	const response = await request(app.getHttpServer())
//  		.post('/accounts')
//  		.send({
//  			name: 'João da Silva',
//  			email: 'joaoSilva@email.com',
//  			password: await hashPassword('12345678'),
//  			role: 'ADMIN',
//  			birthDate: '2005-09-26',
//  			documentType: 'RG',
//  			document: '99.999.999.9',
//  		});

//  	const userOnDatabase = await prisma.user.findUnique({
//  		where: {
//  			email: 'joaoSilva@email.com',
//  		},
//  	});

//  	expect(response.statusCode).toBe(201);
//  	expect(userOnDatabase).toBeTruthy();
//  });

//  it('[POST] /accounts - should throw error with user email already exists', async () => {
//  	await request(app.getHttpServer())
//  		.post('/accounts')
//  		.send({
//  			name: 'Usuário Test III',
//  			email: 'test@email.com',
//  			password: await hashPassword('12345678'),
//  			role: 'ADMIN',
//  			birthDate: '2005-09-26',
//  			documentType: 'RG',
//  			document: '22.222.222.2',
//  		});

//  	const response = await request(app.getHttpServer())
//  		.post('/accounts')
//  		.send({
//  			name: 'Usuário Test IV',
//  			email: 'test@email.com',
//  			password: await hashPassword('12345678'),
//  			role: 'ADMIN',
//  			birthDate: '2001-09-11',
//  			documentType: 'RG',
//  			document: '22.222.222.2',
//  		});

//  	expect(response.statusCode).toBe(409);
//  	expect(response.body).toHaveProperty(
//  		'message',
//  		'Usuário com o mesmo email já existe',
//  	);
//  });
//  it('[POST] /accounts - should throw error with user document already exists', async () => {
//  	await request(app.getHttpServer())
//  		.post('/accounts')
//  		.send({
//  			name: 'Usuário Test I',
//  			email: 'duplicateDocumentTestI@email.com',
//  			password: await hashPassword('12345678'),
//  			role: 'ADMIN',
//  			birthDate: '2005-09-26',
//  			documentType: 'RG',
//  			document: '11.111.111.1',
//  		});

//  	const response = await request(app.getHttpServer())
//  		.post('/accounts')
//  		.send({
//  			name: 'Usuário Test II',
//  			email: 'duplicateDocumentTestII@email.com',
//  			password: await hashPassword('12345678'),
//  			role: 'ADMIN',
//  			birthDate: '2001-09-11',
//  			documentType: 'RG',
//  			document: '11.111.111.1',
//  		});

//  	expect(response.statusCode).toBe(409);
//  	expect(response.body).toHaveProperty(
//  		'message',
//  		'Usuário com o mesmo documento já existe',
//  	);
//  });

//  it('[GET] /accounts/:id', async () => {
//  	const createUser = await request(app.getHttpServer())
//  		.post('/accounts')
//  		.send({
//  			name: 'Chaves',
//  			email: 'chavinho@email.com',
//  			password: await hashPassword('12345678'),
//  			role: 'ADMIN',
//  			birthDate: '2005-09-26',
//  			documentType: 'RG',
//  			document: '88.888.888.8',
//  		});

//  	const userId = createUser.body.id;

//  	const response = await request(app.getHttpServer()).get(
//  		`/accounts/${userId}`,
//  	);

//  	expect(response.statusCode).toBe(200);
//  	expect(response.body).toBeDefined();
//  	expect(response.body).toMatchObject({
//  		name: 'Chaves',
//  		email: 'chavinho@email.com',
//  		document: '88.888.888.8',
//  	});
//  });

//  it('[GET] /accounts/:id - should return 404 for non-existing user', async () => {
//  	const fakeUserId = '0000000000000000-00000000';

//  	const response = await request(app.getHttpServer()).get(
//  		`/accounts/${fakeUserId}`,
//  	);

//  	expect(response.statusCode).toBe(404);
//  	expect(response.body).toHaveProperty(
//  		'message',
//  		'Usuário não encontrado',
//  	);
//  });
//  it('[GET] /accounts', async () => {
//  	const response = await request(app.getHttpServer()).get('/accounts');

//  	expect(response.body).toBeInstanceOf(Array);
//  	expect(response.body[0]).toHaveProperty('name');
//  	expect(response.body[0]).toHaveProperty('email');
//  	expect(response.body[0]).toHaveProperty('role');
//  });
//  it('[DELETE] /accounts/:id', async () => {
//  	const createUser = await request(app.getHttpServer())
//  		.post('/accounts')
//  		.send({
//  			name: 'Kiko',
//  			email: 'tesouro@email.com',
//  			password: await hashPassword('12345678'),
//  			role: 'PATIENT',
//  			birthDate: '2005-09-26',
//  			documentType: 'CPF',
//  			document: '200.300.400.00',
//  		});

//  	const userId = createUser.body.id;

//  	const response = await request(app.getHttpServer()).delete(
//  		`/accounts/${userId}`,
//  	);

//  	expect(response.statusCode).toBe(204);
//  });
// });
