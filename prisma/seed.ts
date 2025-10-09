// TODO
// ?? CRIAR A TABELA DE CONEXÃO ENTRE PACIENTE E PROFISSIONAL ( TALVEZ REMOVA )

import { PrismaClient } from '../generated/prisma';
import { CreateAdminUser } from './seeds/create-adm-user';
import { CreatePatientSchedule } from './seeds/create-patient-schedule';
import { CreatePatientUser } from './seeds/create-patient-user';
import { CreateProfessionalSchedule } from './seeds/create-professional-schedule';
import { CreateUserProfessional } from './seeds/create-professional-user';
import { CreateSpecialties } from './seeds/create-specialties';
import { CreateTypesOfTreatment } from './seeds/create-types-of-treatment';

const prisma = new PrismaClient();

const seed = async () => {
	await prisma.userAgenda.deleteMany();
	await prisma.schedule.deleteMany();
	await prisma.professionalAndPatient.deleteMany();
	await prisma.professional.deleteMany();
	await prisma.user.deleteMany();
	await prisma.specialty.deleteMany();
	await prisma.typesOfTreatment.deleteMany();

	console.log('✔ Database reset');

	await CreateAdminUser();
	await CreateSpecialties();
	await CreateTypesOfTreatment();
	await CreateUserProfessional();
	await CreatePatientUser();
	await CreateProfessionalSchedule();
	await CreatePatientSchedule();
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
