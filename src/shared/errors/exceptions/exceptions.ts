import { appError } from '../appError';

// Funções factory para serem usadas como exceptions.
// Cada função cria um AppError.
// Possui mensagens padrão que podem ser sobrescritas.
export const unauthorized = (message = 'Não autorizado!') =>
  appError('UNAUTHORIZED', message);

export const invalidCredentials = (message = 'Credenciais inválidas!') =>
  appError('INVALID_CREDENTIALS', message);

export const badRequest = (message = 'Requisição inválida!') =>
  appError('BAD_REQUEST', message);

export const forbidden = (message = 'Permissão insuficiente!') =>
  appError('FORBIDDEN', message);

export const conflict = (message = 'Conflito!') =>
  appError('CONFLICT', message);

export const resourceNotFound = (resource: string) =>
  appError('RESOURCE_NOT_FOUND', `${resource} não encontrado!`);

export const databaseError = (message = 'Database error') =>
  appError('DATABASE_ERROR', message);
