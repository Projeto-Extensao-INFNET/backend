import type { UserModel } from '@/domain/models/user.model';

export type ROLE = 'PATIENT' | 'PROFESSIONAL' | 'ADMIN';
export type DOCUMENT_TYPE = 'CPF' | 'RG';
export type PROFESSIONAL_DOCUMENT_TYPE = 'CRM' | 'CRP';
export type TYPE_OF_QUERY = 'ONLINE_VIDEO_CALL' | 'IN_PERSON';
export type PAYMENT_METHOD = 'PIX' | 'CREDIT_CARD';
export type GENDER = 'MALE' | 'FEMALE' | 'TRANSGENDER' | 'NON_BINARY';
export type QUERY_STATUS = 'CANCELED' | 'COMPLETED' | 'SCHEDULED';

export type Payload = {
  username: string;
  sub: string;
  role: ROLE;
};

export type OmittedUserPassword = Omit<UserModel, 'password'>;

export type CreateUserInput = Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>;
