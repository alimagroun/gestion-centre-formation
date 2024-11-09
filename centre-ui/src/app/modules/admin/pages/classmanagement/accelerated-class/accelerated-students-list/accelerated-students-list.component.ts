import {Component, OnInit} from '@angular/core';
import {
  ClasseFormationControllerService
} from "../../../../../../services/services/classe-formation-controller.service";
import {ActivatedRoute} from "@angular/router";
import {SpecialtyResponse} from "../../../../../../services/models/specialty-response";
import {ClassStudentResponse} from "../../../../../../services/models/class-student-response";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-accelerated-students-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './accelerated-students-list.component.html',
  styleUrl: './accelerated-students-list.component.scss'
})
export class AcceleratedStudentsListComponent implements OnInit {

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
      this.classService.findAllStudentByAcceleratedClassId(
        {classId:  Number(this.classId)}
      ).subscribe(students => {
        this.studentsList = students;
        this.isLoading = false;
      });
    }
  }

}
