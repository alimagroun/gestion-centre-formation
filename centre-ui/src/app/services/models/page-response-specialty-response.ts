/* tslint:disable */
/* eslint-disable */
import {SpecialtyResponse} from '../models/specialty-response';

export interface PageResponseSpecialtyResponse {
  content?: Array<SpecialtyResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
