import type { ErrorResponse } from './error.response';
import type { SuccessResponse } from './success.response';

// Tipo unificado de resposta da API: sucesso ou erro usado nos Controllers
export type RequestResponse<T> = SuccessResponse<T> | ErrorResponse;
