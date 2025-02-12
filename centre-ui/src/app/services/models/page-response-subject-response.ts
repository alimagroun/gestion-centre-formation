/* tslint:disable */
/* eslint-disable */
import {SubjectResponse} from '../models/subject-response';

export interface PageResponseSubjectResponse {
  content?: Array<SubjectResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
