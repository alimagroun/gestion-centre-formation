import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {SubjectControllerService} from "../../../../services/services/subject-controller.service";
import {PageResponseSubjectResponse} from "../../../../services/models/page-response-subject-response";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    NgIf
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {
  subjectResponse: PageResponseSubjectResponse = {};
  page: number = 0;
  size: number = 10;

  loading: boolean = false;

  constructor(private subjectService: SubjectControllerService) {}

  ngOnInit(): void {
    this.getAllSubjectsPaginated();
  }

  getAllSubjectsPaginated() {
    this.loading = true;
    this.subjectResponse.content = []
    this.subjectService.getAllSubjects({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.subjectResponse = res;
      this.loading = false;
    });
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.getAllSubjectsPaginated();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.getAllSubjectsPaginated();
  }
}
