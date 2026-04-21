import type { AppError } from './appError';
import { ERROR_CODES } from './exceptions/codes';
import { errorResponse } from './responses/error.response';

// função que retorna o erro da request já tipado via função errorResponse()
export const handleError = (error: AppError) => {
  const { status } = ERROR_CODES[error.code];
  return errorResponse(error.code, status, error.message);
};
