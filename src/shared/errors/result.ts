import type { AppError } from './appError';

// T => o tipo do resultado da request é genérico
// E => o tipo do erro por padrão é AppError, mas não é obrigatório
export type Result<T, E = AppError> =
  | { ok: true; value: T } // value: T => se ok for 'true' retorna o valor tipado em T
  | { ok: false; error: E }; // error: E => se ok for false, retorna o erro tipado em E (por padrão, AppError)

// factory para casos de sucesso
export const ok = <T>(value: T): Result<T, never> => ({
  ok: true,
  value,
});

// factory para casos de erro
export const err = <E>(error: E): Result<never, E> => ({
  ok: false,
  error,
});
