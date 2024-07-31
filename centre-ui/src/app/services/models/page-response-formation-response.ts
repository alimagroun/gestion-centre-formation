/* tslint:disable */
/* eslint-disable */
import { FormationResponse } from '../models/formation-response';
export interface PageResponseFormationResponse {
  content?: Array<FormationResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
