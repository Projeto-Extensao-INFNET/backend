/** biome-ignore-all lint/correctness/noUnusedVariables: is not necessary use these variables*/
// TODO
// ** CRIAR UM USERs COMO PACIENTE [x]
// ** CRIAR UM USERs COMO PROFISSIONAL [x]
// ** CRIAR UM USER COMO ADMIN [x]
// ** CRIAR ESPECIALIDADES (PSIQUIATRA, PSICOLOGO) [x]
// ** CRIAR UM PROFISSIONAL COM OS RELACIONAMENTOS CORRETOS []
// ** CRIAR OS TIPOS DE TRATAMENTO (PSIQUIATRIA INFANTIL, CASAIS ETC) []
// ?? CRIAR A TABELA DE CONEXÃO ENTRE PACIENTE E PROFISSIONAL ( TALVEZ REMOVA )
// ** CRIAR TABELA DE AGENDA DO PROFISSIONAL []
// ** CRIAR TABELA DE AGENDA DO PACIENTE []

import { faker } from '@faker-js/faker';
// ?? devo criar um arquivo entity para cada entidade do banco de dados para ter menos dependência do Prisma? 
// ?? ou apenas criar interfaces e types?
import { PrismaClient, type Specialty } from '../generated/prisma';
import { hashPassword } from '../src/utils';

const prisma = new PrismaClient();

const seed = async () => {
	await prisma.user.deleteMany();
	await prisma.specialty.deleteMany();

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

	const specialtyList: Specialty[] = [];

	await prisma.specialty.createMany({
		data: [{ name: 'Psiquiatria' }, { name: 'Psicologia' }],
	});

	const specialties = await prisma.specialty.findMany();
	specialtyList.push(...specialties);
};

seed().then(() => {
	console.log('database seeded 🌱');
	prisma.$disconnect();
});
