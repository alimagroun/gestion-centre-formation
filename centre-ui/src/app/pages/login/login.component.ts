import {Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";
import {UserControllerService} from "../../services/services/user-controller.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  authRequest: AuthenticationRequest = {userName: '', password: ''};

  //loader
  buttonLoading = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: AuthenticationControllerService,
    private tokenService: TokenService,
    private userService: UserControllerService,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.tokenService.userRoles)
    if (this.tokenService.isTokenValid()) {
      if (this.tokenService.userRoles.includes("ROLE_ADMIN")) {
        this.router.navigate(['admin']);
      } else if (this.tokenService.userRoles.includes("ROLE_STUDENT")) {
        this.router.navigate(['student']);
      } else if (this.tokenService.userRoles.includes("ROLE_TEACHER")) {
        this.router.navigate(['teacher']);
      }
    }
  }

  errorMsg: Array<string> = []

  login() {
    //loader
    this.buttonLoading = true

    this.authRequest.userName = this.loginForm.get('username')?.value!;
    this.authRequest.password = this.loginForm.get('password')?.value!;

    this.authService.authenticate({body: this.authRequest}).subscribe({
      next: (res) => {
        this.buttonLoading = false
        this.tokenService.token = res.token as string;

        // Check if the user must change their password
        this.userService.isMustChangePasswordFirstLogin().subscribe({
          next: (check) => {
            if (check.data === true) {
              this.router.navigate(['first-login-change-password']);
            } else {
              // Redirection normale selon le rôle
              this.tokenService.redirectByRole(this.tokenService.userRoles[0]);
            }
          },
          error: (err) => {
            console.error("Erreur lors du check du mot de passe", err);
          }
        });
      }, error: err => {
        if (err.error.validationErrors) {

          this.buttonLoading = false
          const messages: { [key: string]: string } = {
            'PASSWORD_REQUIRED': 'Mot de passe requis.',
            'PASSWORD_SIZE_8': 'Le mot de passe doit faire au moins 8 caractères.',
            'USER_NAME_REQUIRED': 'Nom d\'utilisateur requis.'
          };
          err.error.validationErrors.forEach((error: string) => {
            const message = messages[error];
            this.errorMsg.push(message)
          });

        } else {
          this.buttonLoading = false
          this.errorMsg = [];
          if (err.error.errorMessage == "LOGIN_PASSWORD_INCORRECT")
            this.errorMsg.push("Nom d'utilisateur ou mot de passe incorrect.");
        }
      }
    });
  }


}
