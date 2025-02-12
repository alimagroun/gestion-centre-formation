/* tslint:disable */
/* eslint-disable */
import { PersonResponse } from '../models/person-response';
import { Role } from '../models/role';
export interface UserResponse {
  createdDate?: string;
  enabled?: boolean;
  id?: number;
  person?: PersonResponse;
  roles?: Array<Role>;
  userName?: string;
}
