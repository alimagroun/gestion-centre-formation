import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {PersonControllerService} from "../../../../services/services/person-controller.service";
import {StudentDetailsResponse} from "../../../../services/models/student-details-response";
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    RouterLink,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf
  ],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit {

  studentDetails: StudentDetailsResponse = {}
  isLoading = false

  constructor(
    private personService: PersonControllerService
  ) {
  }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo() {
    this.isLoading = true
    this.personService.getStudentInfo().subscribe(res => {
      this.isLoading = false
      this.studentDetails = res
    })
  }


}
