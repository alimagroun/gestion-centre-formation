/* tslint:disable */
/* eslint-disable */
import { TeacherResponse } from '../models/teacher-response';
export interface PageResponseTeacherResponse {
  content?: Array<TeacherResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
