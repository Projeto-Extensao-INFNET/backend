import { faker } from '@faker-js/faker/locale/pt_BR';

export const nonExistentUserId = 'non-existent-id'; // id para testes que devem retornar erros

export const generateUniqueName = () => faker.person.fullName();
export const generateBirthDate = () => faker.date.birthdate();
export const generateUniqueEmail = () => faker.internet.email();
export const generateUniqueDocument = () =>
	faker.helpers.replaceSymbols('##.###.###-##');
