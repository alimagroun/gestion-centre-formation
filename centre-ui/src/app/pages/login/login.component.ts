import {Component} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../services/token/token.service";
import {Route, Router} from "@angular/router";

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
export class LoginComponent {


  authRequest: AuthenticationRequest = {userName: '', password: ''};

  //loader
  buttonLoading = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: AuthenticationControllerService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router) {
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

        //Redirect
        if(this.tokenService.userRoles[0] == "ROLE_ADMIN"){
          this.router.navigate(['admin']);
        }
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
          if (err.error.businessErrorDescription == "LOGIN_PASSWORD_INCORRECT")
            this.errorMsg.push("Nom d'utilisateur ou mot de passe incorrect.");
        }
      }
    });
  }

}
