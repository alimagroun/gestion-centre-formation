/* tslint:disable */
/* eslint-disable */
import {Domaine} from '../models/domaine';
import {FormationType} from '../models/formation-type';

export interface Specialty {
  createdDate?: string;
  domaine?: Domaine;
  formationType?: FormationType;
  id?: number;
  lastModifiedDate?: string;
}
