/* tslint:disable */
/* eslint-disable */
export interface RegistrationResponse {
  createdDate?: string;
  fullNameStudent?: string;
  id?: number;
  specialtyId?: number;
  specialtyName?: string;
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  studentId?: number;
}
