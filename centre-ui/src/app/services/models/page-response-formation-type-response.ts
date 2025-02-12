/* tslint:disable */
/* eslint-disable */
import {FormationTypeResponse} from '../models/formation-type-response';

export interface PageResponseFormationTypeResponse {
  content?: Array<FormationTypeResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
