/* tslint:disable */
/* eslint-disable */
import {AcceleratedClassResponse} from '../models/accelerated-class-response';

export interface PageResponseAcceleratedClassResponse {
  content?: Array<AcceleratedClassResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
