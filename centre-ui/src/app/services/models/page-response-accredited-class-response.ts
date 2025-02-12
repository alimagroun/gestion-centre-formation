/* tslint:disable */
/* eslint-disable */
import {AccreditedClassResponse} from '../models/accredited-class-response';

export interface PageResponseAccreditedClassResponse {
  content?: Array<AccreditedClassResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
