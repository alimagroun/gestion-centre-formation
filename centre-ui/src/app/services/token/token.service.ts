import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) {
  }

  set token(token: string) {
    localStorage.setItem("token", token);
  }

  get token() {
    return localStorage.getItem("token") as string;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.authorities;
    }
    return [];
  }

  redirectByRole(role: string): void {
    switch (role) {
      case 'ROLE_ADMIN':
        this.router.navigate(['admin']);
        break;
      case 'ROLE_STUDENT':
        this.router.navigate(['student']);
        break;
      case 'ROLE_TEACHER':
        this.router.navigate(['teacher']);
        break;
      default:
        this.router.navigate(['']); // page par défaut
        break;
    }
  }
}
