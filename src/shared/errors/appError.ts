import type { ErrorCodes } from './exceptions/codes';

// Tipo base de erros do projeto
export type AppError = {
  code: ErrorCodes;
  message: string;
};

// Factory que cria um AppError com código e mensagem padronizados
export const appError = (code: ErrorCodes, message: string): AppError => ({
  code,
  message,
});
