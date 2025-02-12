import {Component, OnInit} from '@angular/core';
import {StudentDetailsResponse} from "../../../../../../services/models/student-details-response";
import {PersonControllerService} from "../../../../../../services/services/person-controller.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {

  studentDetail: StudentDetailsResponse = {}
  studentId: string | null = null;

  constructor(
    private personService: PersonControllerService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get("id")
    })
    this.findStudentDetail()
  }

  findStudentDetail() {
    this.personService.findStudentById({studentId: Number(this.studentId)}).subscribe(res => {
      this.studentDetail = res
    })
  }

}
