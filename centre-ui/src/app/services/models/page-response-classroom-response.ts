/* tslint:disable */
/* eslint-disable */
import { ClassroomResponse } from '../models/classroom-response';
export interface PageResponseClassroomResponse {
  content?: Array<ClassroomResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
