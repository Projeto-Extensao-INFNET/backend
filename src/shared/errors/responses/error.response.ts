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

// Estrutura padrão de resposta de erro enviada pelos controllers
// Monta o payload final de erro com codigo http, status, message e timestamp
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
