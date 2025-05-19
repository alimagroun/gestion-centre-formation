/* tslint:disable */
/* eslint-disable */
import { AcceleratedClassGroup } from '../models/accelerated-class-group';
import { Student } from '../models/student';
export interface AcceleratedClassEntry {
  acceleratedClass?: AcceleratedClassGroup;
  id?: number;
  student?: Student;
}
