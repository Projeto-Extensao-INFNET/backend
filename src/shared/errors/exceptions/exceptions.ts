import { appError } from '../appError';

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
