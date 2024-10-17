/* tslint:disable */
/* eslint-disable */
export interface ParentRequest {
  email?: string;
  firstName: string;
  id?: number;
  isDeceased: boolean;
  lastName: string;
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'WIDOWED';
  phoneNumber: string;
  profession?: string;
  type: 'FATHER' | 'MOTHER';
}
