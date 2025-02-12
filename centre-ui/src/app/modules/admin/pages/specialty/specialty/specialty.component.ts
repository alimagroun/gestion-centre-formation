import {Component} from '@angular/core';
import {ClasseFormationControllerService} from "../../../../../services/services/classe-formation-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";
import {PageResponseSpecialtyResponse} from "../../../../../services/models/page-response-specialty-response";
import {SpecialtyControllerService} from "../../../../../services/services/specialty-controller.service";

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

  specialtyResponse: PageResponseSpecialtyResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private specialtyService: SpecialtyControllerService
  ) {
  }

  findAllClasse() {
    this.loading = true;
    this.specialtyService.findAllSpecialtyPageable({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.specialtyResponse = res
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
