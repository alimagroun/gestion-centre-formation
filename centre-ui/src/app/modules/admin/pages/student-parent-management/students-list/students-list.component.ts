import { Component } from '@angular/core';
import {PersonControllerService} from "../../../../../services/services/person-controller.service";
import {Router} from "@angular/router";
import {ParentResponse} from "../../../../../services/models/parent-response";
import {PageResponseStudentResponse} from "../../../../../services/models/page-response-student-response";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {

  studentResponsePaged: PageResponseStudentResponse = {};
  page: number = 0;
  size: number = 10;

  loading: boolean = false;

  constructor(
    private personService: PersonControllerService,
    private router: Router) {}

  ngOnInit(): void {
    this.findAllStudentsPaged();
  }

  findAllStudentsPaged() {
    this.loading = true;
    this.studentResponsePaged.content = []
    this.personService.findAllStudentsPaged({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.studentResponsePaged = res;
      this.loading = false;
    });
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findAllStudentsPaged();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findAllStudentsPaged();
  }

  viewParentDetails(p: ParentResponse) {
    this.router.navigate(['admin','students', 'student-details', p.id]);
  }
}
