import type { AppError } from '../appError';

export type ErrorResponse = {
  ok: false;
  status: number;
  error: {
    code: AppError['code'];
    message: string;
  };
  timestamp: string;
};

/* 
Função responsável por retornar o erro da requisição já tipado,
recebe o código do erro e a mensagem dinamicamente via AppError()
 */
export const errorResponse = (
  code: AppError['code'],
  status: number,
  message: string,
): ErrorResponse => ({
  ok: false,
  status,
  error: { code, message },
  timestamp: new Date().toISOString(),
});
