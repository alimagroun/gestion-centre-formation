import { Component } from '@angular/core';
import {
  PageResponseAccreditedClassResponse
} from "../../../../../services/models/page-response-accredited-class-response";
import {ClasseFormationControllerService} from "../../../../../services/services/classe-formation-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Router, RouterLink} from "@angular/router";
import {AcceleratedClassResponse} from "../../../../../services/models/accelerated-class-response";

@Component({
  selector: 'app-accredited-class',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './accredited-class.component.html',
  styleUrl: './accredited-class.component.scss'
})
export class AccreditedClassComponent {

  classAccreditedResponse: PageResponseAccreditedClassResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private classService: ClasseFormationControllerService,
    private router : Router
  ) {
  }

  findAllClasse() {
    this.loading = true;
    this.classService.findAllAccreditedClass({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.classAccreditedResponse = res
      this.loading = false
    })
  }

  ngOnInit(): void {
    this.findAllClasse()
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findAllClasse();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findAllClasse();
  }

  showStudents(c: AcceleratedClassResponse) {
    this.router.navigate(['admin/accreditedClass/AccreditedStudentsList', c.id]);
  }
}
