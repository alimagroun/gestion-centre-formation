/* tslint:disable */
/* eslint-disable */
import { AcceleratedClassEntry } from '../models/accelerated-class-entry';
import { Specialty } from '../models/specialty';
export interface AcceleratedClassGroup {
  acceleratedClassEntries?: Array<AcceleratedClassEntry>;
  createdDate?: string;
  endDate?: string;
  groupNumber?: number;
  id?: number;
  lastModifiedDate?: string;
  specialty?: Specialty;
  startDate?: string;
}
