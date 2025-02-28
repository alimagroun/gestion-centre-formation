import {Component, Input} from '@angular/core';
import {ParentRequest} from "../../../../../services/models/parent-request";
import {StudentRequest} from "../../../../../services/models/student-request";
import {DatePipe, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {AddressRequest} from "../../../../../services/models/address-request";
import {DocumentResponse} from "../../../../../services/models/document-response";

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {

  @Input()
  motherRequest: ParentRequest = {
    lastName: "",
    phoneNumber: "",
    firstName: "",
    type: "MOTHER",
    maritalStatus: "MARRIED",
    isDeceased: false
  }

  @Input()
  fatherRequest: ParentRequest = {
    lastName: "",
    phoneNumber: "",
    firstName: "",
    type: "MOTHER",
    maritalStatus: "MARRIED",
    isDeceased: false
  }

  @Input()
  studentRequest: StudentRequest = {firstName: "", lastName: "", levelOfEducation: "", phoneNumber: "", birthDate: ""}

  @Input()
  addressRequest: AddressRequest = {city: "", street: "", zipCode: ""}

  @Input()
  documents: Array<DocumentResponse> = []

  @Input()
  specialtyName: string = ""

  @Input()
  registrationFeesFromChild: number = 0;

}
