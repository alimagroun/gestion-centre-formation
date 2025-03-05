/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
import { Student } from '../models/student';
export interface Parent {
  address?: Address;
  birthDate?: string;
  createdDate?: string;
  email?: string;
  firstName?: string;
  id?: number;
  identityNumber?: string;
  isDeceased?: boolean;
  lastModifiedDate?: string;
  lastName?: string;
  maritalStatus?: 'MARRIED' | 'DIVORCED' | 'WIDOWED';
  phoneNumber?: string;
  profession?: string;
  students?: Array<Student>;
  type?: 'FATHER' | 'MOTHER';
}
