import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {StudentClassResponse} from "../../../../services/models/student-class-response";
import {PersonControllerService} from "../../../../services/services/person-controller.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-student-class-info',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './student-class-info.component.html',
  styleUrl: './student-class-info.component.scss'
})
export class StudentClassInfoComponent implements OnInit {

  response: StudentClassResponse = {}

  isLoading = false

  constructor(
    private personService: PersonControllerService
  ) {
  }

  ngOnInit(): void {
    this.getClass()
  }

  getClass() {
    this.isLoading = true
    this.personService.getStudentClass().subscribe(res => {
      this.response = res
      this.isLoading = false
    })
  }

}
