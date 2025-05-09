/* tslint:disable */
/* eslint-disable */
export interface AdminChangePasswordRequest {
  confirmPassword: string;
  idUser: number;
  newPassword: string;
  resetPasswordChange?: boolean;
}
