/* tslint:disable */
/* eslint-disable */
import { AddressRequest } from '../models/address-request';
export interface TeacherRequest {
  address?: AddressRequest;
  diplomasObtained: string;
  email?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  speciality: string;
  teacherStatus: 'ACTIVE' | 'INACTIVE';
}
