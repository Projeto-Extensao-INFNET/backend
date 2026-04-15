import type { DOCUMENT_TYPE, ROLE } from '@/shared/types';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  role: ROLE;
  documentType: DOCUMENT_TYPE;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}
