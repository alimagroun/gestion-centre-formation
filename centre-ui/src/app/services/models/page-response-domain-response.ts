/* tslint:disable */
/* eslint-disable */
import { DomainResponse } from '../models/domain-response';
export interface PageResponseDomainResponse {
  content?: Array<DomainResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
