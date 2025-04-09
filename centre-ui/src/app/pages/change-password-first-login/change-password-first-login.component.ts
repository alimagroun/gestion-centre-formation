import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserControllerService} from "../../services/services/user-controller.service";
import {TokenService} from "../../services/token/token.service";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-change-password-first-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './change-password-first-login.component.html',
  styleUrl: './change-password-first-login.component.scss'
})
export class ChangePasswordFirstLoginComponent {

  form: FormGroup;
  success = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserControllerService,
    private tokenService: TokenService,
    private toastService: ToastService
  ) {
    this.form = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {validators: this.passwordMatchValidator}
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true
      const newPassword = this.form.value.newPassword;
      this.userService.changePasswordFirstLogin({newPassword: newPassword}).subscribe({
        next: () => {
          this.toastService.showSuccess("Mot de passe modifié avec succès.");
          this.tokenService.redirectByRole(this.tokenService.userRoles[0]);
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
    }
  }
}
