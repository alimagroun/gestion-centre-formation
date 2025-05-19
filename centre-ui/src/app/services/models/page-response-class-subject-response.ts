/* tslint:disable */
/* eslint-disable */
import { ClassSubjectResponse } from '../models/class-subject-response';
export interface PageResponseClassSubjectResponse {
  content?: Array<ClassSubjectResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
