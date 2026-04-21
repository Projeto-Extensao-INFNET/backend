import type { AppError } from './appError';

export type Result<T, E = AppError> =
  | { ok: true; value: T } // value: T => se ok for 'true' retorna o valor das respostas retornadas
  | { ok: false; error: E }; // error: E => se ok for 'false' retorna o valor dos erros retornados da função AppError()

export const ok = <T>(value: T): Result<T, never> => ({
  ok: true,
  value,
});

export const err = <E>(error: E): Result<never, E> => ({
  ok: false,
  error,
});
