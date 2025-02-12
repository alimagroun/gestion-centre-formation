/* tslint:disable */
/* eslint-disable */
import { SchoolYearResponse } from '../models/school-year-response';
export interface PageResponseSchoolYearResponse {
  content?: Array<SchoolYearResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
