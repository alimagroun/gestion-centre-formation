/* tslint:disable */
/* eslint-disable */
import {RegistrationResponse} from '../models/registration-response';

export interface PageResponseRegistrationResponse {
  content?: Array<RegistrationResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
