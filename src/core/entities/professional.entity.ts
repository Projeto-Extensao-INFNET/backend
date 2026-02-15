import type {
  GENDER,
  PAYMENT_METHOD,
  PROFESSIONAL_DOCUMENT_TYPE,
  TYPE_OF_QUERY,
} from '@/shared/types';

export interface ProfessionalEntity {
  id: string;
  typeOfQuery: TYPE_OF_QUERY;
  price: number;
  paymentMethod: PAYMENT_METHOD;
  documentType: PROFESSIONAL_DOCUMENT_TYPE;
  document: string;
  gender: GENDER;
  phone: string | null;
  userId: string;
  specialtyId: string;
  typeOfTreatmentId: string;
}
