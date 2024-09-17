import {Component, OnInit} from '@angular/core';
import {RegistrationControllerService} from "../../../../../services/services/registration-controller.service";
import {PageResponseRegistrationResponse} from "../../../../../services/models/page-response-registration-response";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    DatePipe,
    NgClass
  ],
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.scss'
})
export class RegistrationListComponent implements OnInit{

  registrationPage : PageResponseRegistrationResponse = {}
  page: number = 0;
  size: number = 10;

  loading: boolean = false;

  constructor(
    private registrationService : RegistrationControllerService,
    private router : Router
  ) {
  }

  ngOnInit(): void {
    this.findAllResgitration();
  }

  findAllResgitration(){
    this.loading = true;
    this.registrationPage.content = []
    this.registrationService.findAllRegistrations({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.registrationPage = res;
      this.loading = false;
    });
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findAllResgitration();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findAllResgitration();
  }

  showRegistrationDetails(id: number ) {
    this.router.navigate(['admin/registrationDetails', id]);
  }
}
