import type { AppError } from './appError';
import { ERROR_CODES } from './exceptions/codes';
import { errorResponse } from './responses/error.response';

// Converte AppError em ErrorResponse no formato padrão da API
export const handleError = (error: AppError) => {
  const { status } = ERROR_CODES[error.code]; // Obtém o status HTTP a partir do mapeamento do código de erro
  return errorResponse(error.code, status, error.message);
};
