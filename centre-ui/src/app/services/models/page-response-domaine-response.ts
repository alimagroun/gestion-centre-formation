/* tslint:disable */
/* eslint-disable */
import { DomaineResponse } from '../models/domaine-response';
export interface PageResponseDomaineResponse {
  content?: Array<DomaineResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
