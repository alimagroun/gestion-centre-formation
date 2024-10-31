/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
import { Parent } from '../models/parent';
export interface Student {
  address?: Address;
  createdDate?: string;
  email?: string;
  father?: Parent;
  firstName?: string;
  id?: number;
  identityNumber?: string;
  lastModifiedDate?: string;
  lastName?: string;
  levelOfEducation?: string;
  mother?: Parent;
  phoneNumber?: string;
}
