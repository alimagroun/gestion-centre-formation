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
    AddressFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  parent: ParentRequest = {lastName: "", phoneNumber: "", firstName: ""};
  student: StudentRequest = {firstName: "", lastName: "", levelOfEducation: "", phoneNumber: ""};
  address: AddressRequest = {city: "", street: "", zipCode: ""}
  documents: Array<DocumentResponse> = []
  registreRequest : RegistrationRequest = {}
  statusFormParent = false;
  statusFormStudent = false;
  statusFormAddress = false;
  error : Array<string> = [];

  currentStep: number = 1;
  steps = [
    {name: 'Parent'},
    {name: 'Etudiant'},
    {name: 'Adresse'},
    {name: 'Documents'},
    {name: 'Vérification'},
  ];

  constructor(
    private registerService : RegistrationControllerService,
    private personService : PersonControllerService
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

  register() {
    this.registreRequest.addressRequest = this.address
    this.registreRequest.studentRequest = this.student
    this.registreRequest.parentRequest = this.parent
    this.registreRequest.documents = this.documents.map(document => document.id!);

    this.registerService.register(
      {
        body : this.registreRequest
      }
    ).subscribe(res=>{
    })
  }

  setParentValidated(parent: ParentRequest) {
    this.parent = parent
  }

  async validation(): Promise<boolean> {
    this.error = [];

    if (this.currentStep == 1) {
      const isValid = await this.validateEmailParent(this.parent.email!);
      if (!isValid) {
        this.error.push("Le numéro de téléphone existe déjà");
        return false;
      }
    }

    return true;
  }

  async validateEmailParent(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.personService.emailValidation({ email }).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(false); // Retourner false si une erreur survient
        }
      );
    });
  }



}
