/* tslint:disable */
/* eslint-disable */
import { AddressRequest } from '../models/address-request';
import { ParentRequest } from '../models/parent-request';
import { StudentRequest } from '../models/student-request';
export interface RegistrationRequest {
  addressRequest?: AddressRequest;
  documents?: Array<number>;
  parentRequest?: ParentRequest;
  registrationFees: number;
  remarks?: string;
  specialtyId: number;
  studentRequest?: StudentRequest;
}
