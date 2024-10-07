import { Component } from '@angular/core';
import {PageResponseParentResponse} from "../../../../../services/models/page-response-parent-response";
import {PersonControllerService} from "../../../../../services/services/person-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {ParentResponse} from "../../../../../services/models/parent-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-parents-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './parents-list.component.html',
  styleUrl: './parents-list.component.scss'
})
export class ParentsListComponent {

  parentResponsePaged: PageResponseParentResponse = {};
  page: number = 0;
  size: number = 10;

  loading: boolean = false;

  constructor(
    private personService: PersonControllerService,
    private router: Router) {}

  ngOnInit(): void {
    this.findAllParentsPaged();
  }

  findAllParentsPaged() {
    this.loading = true;
    this.parentResponsePaged.content = []
    this.personService.findAllParentsPaged({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.parentResponsePaged = res;
      this.loading = false;
    });
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findAllParentsPaged();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10); // Convertir en nombre entier
    this.findAllParentsPaged();
  }

  viewParentDetails(p: ParentResponse) {
    this.router.navigate(['admin','parents', 'parent-details', p.id]);
  }
}
