/** biome-ignore-all lint/correctness/noUnusedVariables: is not necessary use these variables*/
// TODO
// ?? CRIAR A TABELA DE CONEXÃO ENTRE PACIENTE E PROFISSIONAL ( TALVEZ REMOVA )

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

	// Cria os horários (a agenda) do Profissional
	const professionals = await prisma.professional.findMany();

	for (let i = 0; i < 10; i++) {
		const professional = faker.helpers.arrayElement(professionals);
		await prisma.schedule.create({
			data: {
				schedules: faker.date.future(),
				isAvailable: true,
				isConfirmed: false,
				professionalId: professional.id,
			},
		});
	}

	// cria a agenda de consultas do Paciente
	const patients = await prisma.user.findMany({
		where: {
			role: 'PATIENT',
		},
	});

	const schedules = await prisma.schedule.findMany({
		where: {
			isAvailable: true,
		},
	});

	for (const patient of patients) {
		const schedule = faker.helpers.arrayElement(schedules);

		await prisma.userAgenda.create({
			data: {
				userId: patient.id,
				scheduleId: schedule.id,
				status: 'SCHEDULED',
				isConfirmed: false,
			},
		});

		// atualiza o status de disponibilidade daquele horário após agendamento
		await prisma.schedule.update({
			where: {
				id: schedule.id,
			},
			data: {
				isAvailable: false,
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
