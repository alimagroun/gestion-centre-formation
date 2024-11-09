import { Component } from '@angular/core';
import {ClassStudentResponse} from "../../../../../../services/models/class-student-response";
import {ActivatedRoute} from "@angular/router";
import {
  ClasseFormationControllerService
} from "../../../../../../services/services/classe-formation-controller.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-accredited-students-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './accredited-students-list.component.html',
  styleUrl: './accredited-students-list.component.scss'
})
export class AccreditedStudentsListComponent {

  classId: string | null = null;
  studentsList : Array<ClassStudentResponse> = [];
  isLoading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private classService: ClasseFormationControllerService,
  ) {}

  ngOnInit(): void {
    this.classId = this.activatedRoute.snapshot.paramMap.get('id');
    this.findAllStudent();
  }

  findAllStudent() {
    if (this.classId) {
      this.classService.findAllStudentByAccreditedClassId(
        {classId:  Number(this.classId)}
      ).subscribe(students => {
        this.studentsList = students;
        this.isLoading = false;
      });
    }
  }

}
