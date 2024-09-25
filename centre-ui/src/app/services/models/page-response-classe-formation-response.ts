/* tslint:disable */
/* eslint-disable */
import { ClasseFormationResponse } from '../models/classe-formation-response';
export interface PageResponseClasseFormationResponse {
  content?: Array<ClasseFormationResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
