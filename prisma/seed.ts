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

import { faker } from '@faker-js/faker/locale/pt_BR';
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
			birthDate: faker.date.birthdate(),
			role: 'ADMIN',
			documentType: 'RG',
			document: faker.helpers.replaceSymbols('##.###.###-#'),
		},
	});

	for (let i = 0; i < 10; i++) {
		const userProfessional = await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: await hashPassword('12345678'),
				birthDate: faker.date.birthdate(),
				role: 'PROFESSIONAL',
				documentType: 'CPF',
				document: faker.helpers.replaceSymbols('###.###.###-##'),
			},
		});
	}
	for (let i = 0; i < 10; i++) {
		const userPatient = await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: await hashPassword('12345678'),
				birthDate: faker.date.birthdate(),
				role: 'PATIENT',
				documentType: 'CPF',
				document: faker.helpers.replaceSymbols('###.###.###-##'),
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

seed()
	.then(() => {
		console.log('database seeded 🌱');
	})
	.catch((error) => {
		console.error('error on seed database:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
