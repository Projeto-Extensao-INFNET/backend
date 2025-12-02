// Tipos dos enums do schema do Prisma
export enum ROLE {
  PATIENT = 'PATIENT',
  PROFESSIONAL = 'PROFESSIONAL',
  ADMIN = 'ADMIN',
}
export enum DOCUMENT_TYPE {
  CPF = 'CPF',
  RG = 'RG',
}

export enum PROFESSIONAL_DOCUMENT_TYPE {
  CRM = 'CRM',
  CRP = 'CRP',
}

export enum TYPE_OF_QUERY {
  ONLINE_VIDEO_CALL = 'ONLINE_VIDEO_CALL',
  IN_PERSON = 'IN_PERSON',
}

export enum PAYMENT_METHOD {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  TRANSGENDER = 'TRANSGENDER',
  NON_BINARY = 'NON_BINARY',
}

export enum QUERY_STATUS {
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  SCHEDULED = 'SCHEDULED',
}
