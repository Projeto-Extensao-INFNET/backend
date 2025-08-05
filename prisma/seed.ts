/** biome-ignore-all lint/correctness/noUnusedVariables: is not necessary use these variables*/
// TODO
// ** CRIAR UM USERs COMO PACIENTE [x]
// ** CRIAR UM USERs COMO PROFISSIONAL [x]
// ** CRIAR UM USER COMO ADMIN [x]
// ** CRIAR ESPECIALIDADES (PSIQUIATRA, PSICOLOGO) [x]
// ** CRIAR UM PROFISSIONAL COM OS RELACIONAMENTOS CORRETOS [x]
// ** CRIAR OS TIPOS DE TRATAMENTO (PSIQUIATRIA INFANTIL, CASAIS ETC) [x]
// ?? CRIAR A TABELA DE CONEXÃO ENTRE PACIENTE E PROFISSIONAL ( TALVEZ REMOVA )
// ** CRIAR TABELA DE AGENDA DO PROFISSIONAL []
// ** CRIAR TABELA DE AGENDA DO PACIENTE []

import { faker } from '@faker-js/faker/locale/pt_BR';
import {
	Gender,
	PaymentMethod,
	PrismaClient,
	ProfessionalDocumentType,
	TypeOfQuery,
} from '../generated/prisma';
import { hashPassword } from '../src/utils';

const prisma = new PrismaClient();

const seed = async () => {
	await prisma.userAgenda.deleteMany();
	await prisma.schedule.deleteMany();
	await prisma.professionalAndPatient.deleteMany();
	await prisma.professional.deleteMany();
	await prisma.user.deleteMany();
	await prisma.specialty.deleteMany();
	await prisma.typesOfTreatment.deleteMany();

	// Criar usuário admin
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

	// Criar especialidades
	await prisma.specialty.createMany({
		data: [{ name: 'Psiquiatria' }, { name: 'Psicologia' }],
	});

	// Criar tipos de tratamento
	await prisma.typesOfTreatment.createMany({
		data: [
			{ name: 'Psiquiatria Infantil' },
			{ name: 'Terapia de Casais' },
			{ name: 'Terapia Individual' },
		],
	});

	const specialties = await prisma.specialty.findMany();
	const typesOfTreatment = await prisma.typesOfTreatment.findMany();

	// Criar usuários profissionais com seus registros na tabela professionals
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

		await prisma.professional.create({
			data: {
				userId: userProfessional.id,
				typeOfQuery: faker.helpers.arrayElement([
					TypeOfQuery.ONLINE_VIDEO_CALL,
					TypeOfQuery.IN_PERSON,
				]),
				price: Number(faker.commerce.price({ min: 30, max: 300 })),
				paymentMethod: faker.helpers.arrayElement([
					PaymentMethod.CREDIT_CARD,
					PaymentMethod.PIX,
				]),
				documentType: faker.helpers.arrayElement([
					ProfessionalDocumentType.CRM,
					ProfessionalDocumentType.CRP,
				]),
				document: faker.helpers.replaceSymbols('####/##'),
				gender: faker.helpers.arrayElement([
					Gender.MALE,
					Gender.FEMALE,
					Gender.NON_BINARY,
					Gender.TRANSGENDER,
				]),
				avatar: faker.image.avatar(),
				phone: faker.phone.number(),
				specialtyId: faker.helpers.arrayElement(specialties).id,
				typeOfTreatmentId:
					faker.helpers.arrayElement(typesOfTreatment).id,
			},
		});
	}

	// Criar usuários pacientes
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
