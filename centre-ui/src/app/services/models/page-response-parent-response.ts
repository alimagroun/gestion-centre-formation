/* tslint:disable */
/* eslint-disable */
import { ParentResponse } from '../models/parent-response';
export interface PageResponseParentResponse {
  content?: Array<ParentResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
