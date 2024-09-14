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

  nextStep() {
    this.validation()
    if ((this.statusFormParent || this.statusFormStudent || this.statusFormAddress) && this.validation()) {
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
      console.log("success ",res)
    })
  }

  setParentValidated(parent: ParentRequest) {
    this.parent = parent
  }

  validation(): boolean{
    this.error = []
    console.log(this.parent)

    if(this.parent.id == null && this.currentStep == 1){
      console.log(this.validateEmailParent(this.parent.email!))
      if(this.validateEmailParent(this.parent.phoneNumber!)){
        this.error.push("Le numéro de téléphone existe déjà")
        return false
      }
    }

    return true
  }
  validateEmailParent(email: string ): boolean{
    this.personService.emailValidation({email}).subscribe(res => {
      return res;
    })
    return false
  }
}
