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
  id?: number;
  parent?: ParentDetails;
  registrationFees?: number;
  remarks?: string;
  specialtyName?: string;
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  student?: StudentDetails;
}
