/* tslint:disable */
/* eslint-disable */
import { StudentResponse } from '../models/student-response';
export interface ParentDetailResponse {
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  phoneNumber?: string;
  profession?: string;
  students?: Array<StudentResponse>;
}
