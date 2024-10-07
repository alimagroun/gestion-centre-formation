import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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

  parent: ParentRequest = {lastName: "", phoneNumber: "", firstName: ""};
  student: StudentRequest = {firstName: "", lastName: "", levelOfEducation: "", phoneNumber: ""};
  address: AddressRequest = {city: "", street: "", zipCode: ""}
  documents: Array<DocumentResponse> = []
  registrationFeesFromChild: number = 0;
  specialtyName = ""
  registreRequest : RegistrationRequest = {specialtyId:0, registrationFees:0}
  statusFormParent = false;
  statusFormStudent = false;
  statusFormAddress = false;
  error : Array<string> = [];

  currentStep: number = 1;
  steps = [
    {name: 'Parent'},
    {name: 'Etudiant'},
    {name: 'Adresse'},
    {name: 'Spécialité'},
    {name: 'Documents'},
    {name: 'Vérification'},
  ];
  loading= false;

  constructor(
    private registerService : RegistrationControllerService,
    private personService : PersonControllerService,
    private toastService : ToastService,
    private router: Router
  ) {
  }

  get progress() {
    return (this.currentStep - 1) * 100 / (this.steps.length - 1);
  }

  async nextStep() {
    const isValid = await this.validation();
    if (isValid && (this.statusFormParent || this.statusFormStudent || this.statusFormAddress)) {
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
    this.registreRequest.specialtyId = specialty.id!
    this.specialtyName = specialty.formationTypeName + "-" + specialty.domaineName
  }

  register() {
    this.loading = true
    this.registreRequest.addressRequest = this.address
    this.registreRequest.studentRequest = this.student
    this.registreRequest.parentRequest = this.parent
    this.registreRequest.documents = this.documents.map(document => document.id!);
    this.registreRequest.registrationFees = this.registrationFeesFromChild

    this.registerService.register(
      {
        body : this.registreRequest
      }
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe(res=>{
      this.loading = false
      this.toastService.showSuccess("Ajout effectué avec succès !");
      this.router.navigate(['admin/registrationList']);
    })
  }

  setParentValidated(parent: ParentRequest) {
    this.parent = parent
  }

  async validation(): Promise<boolean> {
    this.error = [];

    if (this.currentStep == 1 && this.parent.id == undefined) {
      const isValid = await this.validateEmail(this.parent.email!);
      if (isValid) {
        this.error.push("Email "+ this.parent.email+" existe déjà");
        return false;
      }
    }
    else if(this.currentStep == 2) {
      const isValid = await this.validateEmail(this.student.email!);
      const isTelValid = await  this.validateTel(this.student.phoneNumber!);
      if (isValid) {
        this.error.push("Email "+ this.student.email+" existe déjà");
        return false;
      }
      if (isTelValid) {
        this.error.push("Le numéro de téléphone "+ this.student.phoneNumber+" existe déjà");
        return false;
      }
    } else if (this.currentStep == 4) {
      if(this.registreRequest.specialtyId == 0){
        this.toastService.showError("Aucune spécialité sélectionnée. Veuillez en choisir une pour continuer.");
        return false;
      }
    }

    return true;
  }

  async validateEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.personService.emailValidation({ email }).subscribe(
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
    return new Promise((resolve, reject) => {
      this.personService.phoneNumberValidation({ phoneNumber }).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(false);
        }
      );
    });
  }



}
