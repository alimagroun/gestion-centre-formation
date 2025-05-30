import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ParentFormComponent} from "./parent-form/parent-form.component";
import {StudentFormComponent} from "./student-form/student-form.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ParentRequest} from "../../../../services/models/parent-request";
import {StudentRequest} from "../../../../services/models/student-request";
import {DocumentFormComponent} from "./document-form/document-form.component";
import {VerificationComponent} from "./verification/verification.component";
import {AddressFormComponent} from "./address-form/address-form.component";
import {AddressRequest} from "../../../../services/models/address-request";
import {DocumentResponse} from "../../../../services/models/document-response";
import {RegistrationRequest} from "../../../../services/models/registration-request";
import {RegistrationControllerService} from "../../../../services/services/registration-controller.service";
import {PersonControllerService} from "../../../../services/services/person-controller.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs";
import {SpecialtyFormComponent} from "./specialty-form/specialty-form.component";
import {SpecialtyResponse} from "../../../../services/models/specialty-response";
import {ToastService} from "../../../../services/toast/toast.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ParentFormComponent,
    StudentFormComponent,
    NgForOf,
    NgClass,
    NgIf,
    DocumentFormComponent,
    VerificationComponent,
    AddressFormComponent,
    SpecialtyFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  mother: ParentRequest = {
    lastName: "",
    phoneNumber: "",
    firstName: "",
    type: "MOTHER",
    isDeceased: false,
    maritalStatus: "MARRIED",
    isChecked: false
  };
  father: ParentRequest = {
    lastName: "",
    phoneNumber: "",
    firstName: "",
    type: "FATHER",
    isDeceased: false,
    maritalStatus: "MARRIED",
    isChecked: false
  };
  student: StudentRequest = {firstName: "", lastName: "", levelOfEducation: "", phoneNumber: "", birthDate: ""};
  address: AddressRequest = {city: "", street: "", zipCode: ""}
  documents: Array<DocumentResponse> = []
  registrationFeesFromChild: number = 0;
  specialtyName = ""
  selectedSpecialty: SpecialtyResponse = {}
  registreRequest: RegistrationRequest = {specialtyId: 0, registrationFees: 0}
  statusFormParent = false;
  statusFormStudent = false;
  statusFormAddress = false;
  isLoading = false;

  error: Array<string> = [];

  currentStep: number = 1;
  steps = [
    {name: 'Etudiant'},
    {name: 'Parent'},
    {name: 'Adresse'},
    {name: 'Spécialité'},
    {name: 'Documents'},
    {name: 'Vérification'},
  ];
  loading = false;

  constructor(
    private registerService: RegistrationControllerService,
    private personService: PersonControllerService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  get progress() {
    return (this.currentStep - 1) * 100 / (this.steps.length - 1);
  }

  async nextStep() {
    const isValid = await this.validation();
    if (isValid && (this.statusFormStudent || this.statusFormParent || this.statusFormAddress)) {
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
      }
    }
  }


  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validationFormParent(status: boolean) {
    this.statusFormParent = status;
  }

  validationFormStudent(status: boolean) {
    console.log(status)
    this.statusFormStudent = status;
  }

  validationFormAddress(status: boolean) {
    this.statusFormAddress = status;
  }

  setListDocumentSelected(listDocumentSelected: Array<DocumentResponse>) {
    this.documents = listDocumentSelected;
  }

  onRegistrationFeesChange(fees: number): void {
    this.registrationFeesFromChild = fees;
  }

  onSpecialtySelected(specialty: SpecialtyResponse) {
    this.selectedSpecialty = specialty;
    this.registreRequest.specialtyId = specialty.id!
    this.specialtyName = specialty.formationTypeName + "-" + specialty.domaineName
  }

  register() {
    this.loading = true
    this.registreRequest.addressRequest = this.address
    this.registreRequest.studentRequest = this.student
    this.registreRequest.motherRequest = this.mother
    this.registreRequest.fatherRequest = this.father
    this.registreRequest.documents = this.documents.map(document => document.id!);
    this.registreRequest.registrationFees = this.registrationFeesFromChild

    this.registerService.register(
      {
        body: this.registreRequest
      }
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe(res => {
      this.loading = false
      this.toastService.showSuccess("Ajout effectué avec succès !");
      this.router.navigate(['admin/registrationList']);
    })
  }

  setMotherRequest(parent: ParentRequest) {
    this.mother = parent
  }

  setFatherRequest(parent: ParentRequest) {
    this.father = parent
  }

  async validation(): Promise<boolean> {
    this.isLoading = true;
    this.error = [];
    if (this.currentStep == 1) {
      const isEmailValid = await this.validateEmail(this.student.email!);
      const isTelValid = await this.validateTel(this.student.phoneNumber!);
      const isIdentityNumberValid = await this.validateIdentityNumber(this.student.identityNumber!);

      if (isEmailValid) {
        this.toastService.showError("Email " + this.student.email + " existe déjà");
        return false;
      }
      if (isTelValid) {
        this.toastService.showError("Le numéro de téléphone " + this.student.phoneNumber + " existe déjà");
        return false;
      }
      if (isIdentityNumberValid) {
        this.toastService.showError("CIN " + this.student.identityNumber + " existe déjà");
        return false;
      }

      /*if (this.mother.phoneNumber == this.student.phoneNumber || this.father.phoneNumber == this.student.phoneNumber) {
        this.toastService.showError("Le numéro de téléphone de l'étudiant ne peut pas être identique à celui du parent.")
        return false;
      }

      if (this.mother.email && this.mother.email == this.student.email) {
        this.toastService.showError("Email de l'étudiant ne peut pas être identique à celui du parent.")
        return false;
      }

      if (this.father.email && this.father.email == this.student.email) {
        this.toastService.showError("Email de l'étudiant ne peut pas être identique à celui du parent.")
        return false;
      }*/
    } else if (this.currentStep == 2) {

      const isFatherChecked = this.father.isChecked;
      const fatherPhoneNumber = this.father.phoneNumber;
      const fatherEmail = this.father.email;

      const isMotherChecked = this.mother.isChecked;
      const motherPhoneNumber = this.mother.phoneNumber;
      const motherEmail = this.mother.email;

      const studentPhoneNumber = this.student.phoneNumber;
      const studentEmail = this.student.email;

      const isMotherEmailValid = await this.validateEmail(this.mother.email!);
      const isFatherEmailValid = await this.validateEmail(this.mother.email!);
      const isMotherTelValid = await this.validateTel(this.mother.phoneNumber!);
      const isFatherTelValid = await this.validateTel(this.mother.phoneNumber!);

      //check if the parent's phone number
      if (isMotherChecked && motherPhoneNumber) {
        if (studentPhoneNumber == motherPhoneNumber) {
          this.toastService.showError("Le numéro de téléphone " + motherPhoneNumber + " existe déjà");
          this.isLoading = false;
          return false;
        }
      }

      if (isFatherChecked && fatherPhoneNumber) {
        if (studentPhoneNumber == fatherPhoneNumber) {
          this.toastService.showError("Le numéro de téléphone " + fatherPhoneNumber + " existe déjà");
          this.isLoading = false;
          return false;
        }
      }

      if (isFatherChecked && fatherPhoneNumber
        && isMotherChecked && motherPhoneNumber
      ) {
        if (fatherPhoneNumber == motherPhoneNumber) {
          this.toastService.showError("Le numéro de téléphone de la mère doit être différent de celui du père.");
          this.isLoading = false;
          return false;
        }
      }

      if (isMotherTelValid) {
        this.toastService.showError("Le numéro de téléphone " + this.mother.phoneNumber + " existe déjà");
        this.isLoading = false;
        return false;
      }

      if (isFatherTelValid) {
        this.toastService.showError("Le numéro de téléphone " + this.father.phoneNumber + " existe déjà");
        this.isLoading = false;
        return false;
      }

      //check the parent's email
      if (isMotherChecked && motherEmail) {
        if (studentEmail == motherEmail) {
          this.toastService.showError("Email " + motherEmail + " existe déjà");
          this.isLoading = false;
          return false;
        }
      }

      if (isFatherChecked && fatherEmail) {
        if (studentEmail == fatherEmail) {
          this.toastService.showError("Email " + fatherEmail + " existe déjà");
          this.isLoading = false;
          return false;
        }
      }

      if (isFatherChecked && fatherEmail
        && isMotherChecked && motherEmail
      ) {
        if (fatherEmail == motherEmail) {
          this.toastService.showError("L'e-mail de la mère doit être différent de l'e-mail du père.");
          this.isLoading = false;
          return false;
        }
      }
      if (isMotherEmailValid) {
        this.toastService.showError("Email " + this.mother.email + " existe déjà");
        this.isLoading = false;
        return false;
      }
      if (isFatherEmailValid) {
        this.toastService.showError("Email " + this.father.email + " existe déjà");
        this.isLoading = false;
        return false;
      }

      if (!isMotherChecked && !isFatherChecked) {
        this.toastService.showError("Vous devez renseigner au moins les informations de la mère ou du père.");
        this.isLoading = false;
        return false;
      }
    } else if (this.currentStep == 4) {
      if (this.registreRequest.specialtyId == 0) {
        this.toastService.showError("Aucune spécialité sélectionnée. Veuillez en choisir une pour continuer.");
        return false;
      }
    }

    this.isLoading = false;
    return true;
  }

  async validateEmail(email: string): Promise<boolean> {
    if (!email) {
      return false;
    }
    return new Promise((resolve, reject) => {
      this.personService.emailValidation({email}).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(false);
        }
      );
    });
  }

  async validateTel(phoneNumber: string): Promise<boolean> {
    if (!phoneNumber) {
      return false;
    }
    return new Promise((resolve, reject) => {
      this.personService.phoneNumberValidation({phoneNumber}).subscribe(
        (res) => {
          this.isLoading = false;
          resolve(res);
        },
        (error) => {
          reject(false);
        }
      );
    });
  }

  async validateIdentityNumber(identityNumber: string): Promise<boolean> {
    if (!identityNumber) {
      return false;
    }
    return new Promise((resolve, reject) => {
      this.personService.identityNumberValidation({identityNumber}).subscribe(
        (res) => {
          this.isLoading = false;
          resolve(res);
        },
        (error) => {
          reject(false);
        }
      );
    });
  }


}
