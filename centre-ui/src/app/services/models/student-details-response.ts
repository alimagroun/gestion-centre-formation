/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { ParentDto } from '../models/parent-dto';
import { ParentStatusDto } from '../models/parent-status-dto';
export interface StudentDetailsResponse {
  address?: AddressDto;
  email?: string;
  father?: ParentDto;
  firstName?: string;
  id?: number;
  lastName?: string;
  levelOfEducation?: string;
  mother?: ParentDto;
  parentStatus?: ParentStatusDto;
  phoneNumber?: string;
}
