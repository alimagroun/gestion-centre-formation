import {Component} from '@angular/core';
import {PageResponseDomaineResponse} from "../../../../../services/models/page-response-domaine-response";
import {DomaineControllerService} from "../../../../../services/services/domaine-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-domain',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './domain.component.html',
  styleUrl: './domain.component.scss'
})
export class DomainComponent {

  domainResponse: PageResponseDomaineResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private domainService: DomaineControllerService
  ) {
  }

  findAllDomain() {
    this.loading = true;
    this.domainService.findAllDomain({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.domainResponse = res
      this.loading = false
    })
  }

  ngOnInit(): void {
    this.findAllDomain()
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findAllDomain();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findAllDomain();
  }
}
