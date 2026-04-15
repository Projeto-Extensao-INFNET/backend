import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const generateUUID = (): string => {
  return uuidv4();
};

export const generateAvatar = () => faker.image.avatar();
export const generateBirthDate = () => faker.date.birthdate();
export const generateName = () => faker.person.fullName();
export const generateEmail = () => faker.internet.email();

export const generateUniqueCPF = () =>
  faker.helpers.replaceSymbols('###.###.###-##');

export const generateUniqueRG = () =>
  faker.helpers.replaceSymbols('##.###.###-#');

export const generateUniqueCRM = () =>
  faker.helpers.replaceSymbols(`CRM/RJ ${faker.string.numeric(6)}`);
