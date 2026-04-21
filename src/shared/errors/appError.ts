import type { ErrorCodes } from './exceptions/codes';

export type AppError = {
  code: ErrorCodes;
  message: string;
};

// função responsável por repassar o código e a mensagem do erro
export const appError = (code: ErrorCodes, message: string): AppError => ({
  code,
  message,
});
