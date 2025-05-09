import {Component, OnInit} from '@angular/core';
import {PageResponseUserResponse} from "../../../../services/models/page-response-user-response";
import {UserControllerService} from "../../../../services/services/user-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminChangePasswordRequest} from "../../../../services/models/admin-change-password-request";
import {ToastService} from "../../../../services/toast/toast.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  userRespone: PageResponseUserResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  passwordForm: FormGroup;
  selectedUser: any;
  changePasswordRequest: AdminChangePasswordRequest = {
    confirmPassword: "",
    idUser: 0,
    newPassword: "",
    resetPasswordChange: false
  }

  constructor(
    private userService: UserControllerService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.passwordForm = this.formBuilder.group({
      username: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      changeOnFirstLogin: [false]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.findUserPaginated();
  }

  findUserPaginated() {
    this.loading = true;
    this.userService.findAllUsers({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.userRespone = res
      this.loading = false;
    })
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findUserPaginated();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findUserPaginated();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return {mismatch: true};
    }
  }

  preparePasswordChange(user: any): void {
    this.selectedUser = user;
    this.passwordForm.patchValue({
      username: user.userName,
      changeOnFirstLogin: false
    });
  }

  updatePassword(): void {

    this.changePasswordRequest.idUser = this.selectedUser.id;
    this.changePasswordRequest.newPassword = this.passwordForm.value.newPassword;
    this.changePasswordRequest.confirmPassword = this.passwordForm.value.confirmPassword;
    this.changePasswordRequest.resetPasswordChange = this.passwordForm.value.changeOnFirstLogin;

    this.userService.adminChangeUserPassword({body: this.changePasswordRequest}).subscribe(res => {
      this.toastService.showSuccess('Mot de passe changé avec succès');
      this.changePasswordRequest = {
        confirmPassword: "",
        idUser: 0,
        newPassword: "",
        resetPasswordChange: false
      }
      this.passwordForm.reset();
    }, error => {
      this.toastService.showError('Erreur lors de la modification du mot de passe');
    })
  }
}
