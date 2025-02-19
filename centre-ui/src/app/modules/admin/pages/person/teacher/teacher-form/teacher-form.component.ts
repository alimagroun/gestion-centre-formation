import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {TeacherRequest} from "../../../../../../services/models/teacher-request";
import {AddressRequest} from "../../../../../../services/models/address-request";
import {PersonControllerService} from "../../../../../../services/services/person-controller.service";
import {ToastService} from "../../../../../../services/toast/toast.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss'
})
export class TeacherFormComponent {

  teacherRequest: TeacherRequest = {
    diplomasObtained: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    speciality: "",
    teacherStatus: "INACTIVE"
  }

  addressRequest: AddressRequest = {city: "", street: "", zipCode: ""}
  isLoading: boolean = false;

  teacherForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9+ ]{8,15}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    speciality: new FormControl('', Validators.required),
    diplomasObtained: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4,6}$')])
  });

  constructor(
    private teacherService: PersonControllerService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  onSubmit() {
    if (this.teacherForm.valid) {

      this.isLoading = true;

      const formValues = this.teacherForm.value;

      this.addressRequest = {
        street: formValues.street!,
        city: formValues.city!,
        zipCode: formValues.postalCode!,
      };

      this.teacherRequest = {
        firstName: formValues.firstName!,
        lastName: formValues.lastName!,
        phoneNumber: formValues.phoneNumber!,
        email: formValues.email!,
        diplomasObtained: formValues.diplomasObtained!,
        speciality: formValues.speciality!,
        address: this.addressRequest!,
        teacherStatus: "ACTIVE",
      };

      this.teacherService.addTeacher({body: this.teacherRequest}).subscribe({
        next: () => {
          this.toastService.showSuccess("Ajouté avec succès !");
          this.router.navigate(['admin/teachers']);
        },
        error: (error) => {
          this.isLoading = false;
          switch (error.error.errorDescription) {
            case "PHONE_NUMBER_ALREADY_EXISTS":
              this.toastService.showError("Le numéro de téléphone existe déjà.");
              break;
            case "EMAIL_ALREADY_EXISTS":
              this.toastService.showError("L'adresse e-mail existe déjà.");
              break;
            default:
              this.toastService.showError("Une erreur est survenue. Veuillez réessayer.");
          }
        }
      });
    }
  }

}
