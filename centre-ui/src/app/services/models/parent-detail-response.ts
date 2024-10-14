/* tslint:disable */
/* eslint-disable */
import { StudentResponse } from '../models/student-response';
export interface ParentDetailResponse {
  email?: string;
  firstName?: string;
  id?: number;
  isDeceased?: boolean;
  lastName?: string;
  maritalStatus?: 'MARRIED' | 'DIVORCED';
  phoneNumber?: string;
  profession?: string;
  students?: Array<StudentResponse>;
  type?: 'FATHER' | 'MOTHER';
}
