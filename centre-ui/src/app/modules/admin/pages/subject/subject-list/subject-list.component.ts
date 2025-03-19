import {Component, OnInit} from '@angular/core';
import {PageResponseSubjectResponse} from "../../../../../services/models/page-response-subject-response";
import {SubjectControllerService} from "../../../../../services/services/subject-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent implements OnInit {

  subjectResponse: PageResponseSubjectResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private subjectService: SubjectControllerService
  ) {
  }

  ngOnInit(): void {
    this.findSubjectPaginated();
  }

  findSubjectPaginated() {
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
    this.findSubjectPaginated();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findSubjectPaginated();
  }

  downloadPdf(id: number) {
    this.subjectService.getPdf({id}).subscribe((data) => {
      const file = new Blob([data], {type: 'application/pdf'});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);

      const now = new Date();
      const formattedDate = now.toISOString().replace(/[-T:.Z]/g, '');

      link.download = `matiere_${formattedDate}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }
}
