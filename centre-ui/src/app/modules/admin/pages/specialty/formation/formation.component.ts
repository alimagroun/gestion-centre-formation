import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";
import {FromationControllerService} from "../../../../../services/services/fromation-controller.service";
import {PageResponseFormationTypeResponse} from "../../../../../services/models/page-response-formation-type-response";

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss'
})
export class FormationComponent implements OnInit {

  formationResponse: PageResponseFormationTypeResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private formationService: FromationControllerService
  ) {
  }

  findAllFroamtion() {
    this.loading = true;
    this.formationService.findAllFormation({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.formationResponse = res
      this.loading = false
    })
  }

  ngOnInit(): void {
    this.findAllFroamtion()
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findAllFroamtion();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findAllFroamtion();
  }
}
