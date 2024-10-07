/* tslint:disable */
/* eslint-disable */
import { StudentResponse } from '../models/student-response';
export interface PageResponseStudentResponse {
  content?: Array<StudentResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
