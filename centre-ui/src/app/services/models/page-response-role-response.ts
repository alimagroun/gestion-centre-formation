/* tslint:disable */
/* eslint-disable */
import { RoleResponse } from '../models/role-response';
export interface PageResponseRoleResponse {
  content?: Array<RoleResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
