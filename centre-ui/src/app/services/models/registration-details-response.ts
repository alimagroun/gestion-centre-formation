/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
import { DocumentRegistrationResponse } from '../models/document-registration-response';
import { ParentDetails } from '../models/parent-details';
import { StudentDetails } from '../models/student-details';
export interface RegistrationDetailsResponse {
  address?: Address;
  createdDate?: string;
  documentRegistrationResponseList?: Array<DocumentRegistrationResponse>;
  father?: ParentDetails;
  id?: number;
  mother?: ParentDetails;
  registrationFees?: number;
  remarks?: string;
  specialtyId?: number;
  specialtyName?: string;
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  student?: StudentDetails;
}
