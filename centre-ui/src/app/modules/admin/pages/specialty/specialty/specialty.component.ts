import { Component } from '@angular/core';
import {
  PageResponseClasseFormationResponse
} from "../../../../../services/models/page-response-classe-formation-response";
import {ClasseFormationControllerService} from "../../../../../services/services/classe-formation-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent {

  classeResponse: PageResponseClasseFormationResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private classeService: ClasseFormationControllerService
  ) {
  }

  findAllClasse() {
    this.loading = true;
    this.classeService.findAllClasses({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.classeResponse = res
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
}
