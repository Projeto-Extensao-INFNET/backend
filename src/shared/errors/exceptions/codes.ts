import { HttpStatus } from '@nestjs/common';

// Mapeia códigos de erro da aplicação para status HTTP
export const ERROR_CODES = {
  // Authentication & Authorization (401, 403)
  UNAUTHORIZED: { code: 'UNAUTHORIZED', status: HttpStatus.UNAUTHORIZED },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    status: HttpStatus.UNAUTHORIZED,
  },
  FORBIDDEN: { code: 'FORBIDDEN', status: HttpStatus.FORBIDDEN },

  // Client Errors (400, 404, 409, 422)
  BAD_REQUEST: { code: 'BAD_REQUEST', status: HttpStatus.BAD_REQUEST },
  CONFLICT: { code: 'CONFLICT', status: HttpStatus.CONFLICT },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  RESOURCE_NOT_FOUND: {
    code: 'RESOURCE_NOT_FOUND',
    status: HttpStatus.NOT_FOUND,
  },

  // Server Errors (500)
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  DATABASE_ERROR: {
    code: 'DATABASE_ERROR',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as const;

//  União das chaves de erro disponíveis no mapeamento
export type ErrorCodes = keyof typeof ERROR_CODES;
