/* tslint:disable */
/* eslint-disable */
import { ClassroomResponse } from '../models/classroom-response';
export interface ApiResponseListClassroomResponse {
  data?: Array<ClassroomResponse>;
  message?: string;
  status?: number;
  success?: boolean;
}
