/** biome-ignore-all lint/correctness/noUnusedVariables: is not necessary use these variables*/
// TODO
// ** CRIAR UM USERs COMO PACIENTE [x]
// ** CRIAR UM USERs COMO PROFISSIONAL [x]
// ** CRIAR UM USER COMO ADMIN [x]
// ** CRIAR ESPECIALIDADES (PSIQUIATRA, PSICOLOGO) []
// ** CRIAR UM PROFISSIONAL COM OS RELACIONAMENTOS CORRETOS []
// ** CRIAR OS TIPOS DE TRATAMENTO (PSIQUIATRIA INFANTIL, CASAIS ETC) []
// ?? CRIAR A TABELA DE CONEXÃO ENTRE PACIENTE E PROFISSIONAL ( TALVEZ REMOVA )
// ** CRIAR TABELA DE AGENDA DO PROFISSIONAL []
// ** CRIAR TABELA DE AGENDA DO PACIENTE []

import { faker } from '@faker-js/faker';
// ?? devo criar uma entidade User para não ter tanta dependência do prisma? essa entidade seria para manter a tipagem correta talvez?
import { PrismaClient, type User } from '../generated/prisma';
import { hashPassword } from '../src/utils';

const prisma = new PrismaClient();

const seed = async () => {
	await prisma.user.deleteMany();

	const usersProfessionals: User[] = [];

	const userAdmin = await prisma.user.create({
		data: {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: await hashPassword('12345678'),
			role: 'ADMIN',
			documentType: 'RG',
			document: '00.000.000-0',
		},
	});

	for (let i = 0; i < 10; i++) {
		const userProfessional = await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: await hashPassword('12345678'),
				role: 'PROFESSIONAL',
				documentType: 'CPF',
				document: '000.000.000-00',
			},
		});
	}
	for (let i = 0; i < 10; i++) {
		const userPatient = await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: await hashPassword('12345678'),
				role: 'PATIENT',
				documentType: 'CPF',
				document: '000.000.000-00',
			},
		});
	}
};

seed().then(() => {
	console.log('database seeded 🌱');
});
