import {Component, Input} from '@angular/core';
import {ParentRequest} from "../../../../../services/models/parent-request";
import {StudentRequest} from "../../../../../services/models/student-request";
import {NgForOf} from "@angular/common";
import {AddressRequest} from "../../../../../services/models/address-request";
import {DocumentResponse} from "../../../../../services/models/document-response";

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {

  @Input()
  parentRequest : ParentRequest = {lastName: "", phoneNumber: "", firstName: ""}

  @Input()
  studentRequest : StudentRequest = {firstName: "", lastName: "", levelOfEducation: "", phoneNumber: ""}

  @Input()
  addressRequest : AddressRequest = {city: "", street: "", zipCode: ""}

  @Input()
  documents: Array<DocumentResponse> = []

}
