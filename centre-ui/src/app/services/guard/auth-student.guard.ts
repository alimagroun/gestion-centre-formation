import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../token/token.service";

export const authStudentGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isTokenNotValid()) {
    router.navigate(['']);
    return false;
  } else {
    if (tokenService.userRoles[0] != "ROLE_STUDENT") {
      router.navigate(['access-denied']);
    }
  }
  return true;
};
