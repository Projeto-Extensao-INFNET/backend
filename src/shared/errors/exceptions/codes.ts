import { HttpStatus } from '@nestjs/common';

export const ERROR_CODES = {
  UNAUTHORIZED: { code: 'UNAUTHORIZED', status: HttpStatus.UNAUTHORIZED },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    status: HttpStatus.UNAUTHORIZED,
  },
  BAD_REQUEST: { code: 'BAD_REQUEST', status: HttpStatus.BAD_REQUEST },
  CONFLICT: { code: 'CONFLICT', status: HttpStatus.CONFLICT },
  FORBIDDEN: { code: 'FORBIDDEN', status: HttpStatus.FORBIDDEN },
  RESOURCE_NOT_FOUND: {
    code: 'RESOURCE_NOT_FOUND',
    status: HttpStatus.NOT_FOUND,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as const;

export type ErrorCodes = keyof typeof ERROR_CODES;
