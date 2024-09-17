import {Component, OnInit} from '@angular/core';
import {PageResponseUserResponse} from "../../../../services/models/page-response-user-response";
import {UserControllerService} from "../../../../services/services/user-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  userRespone : PageResponseUserResponse = {}
  page: number = 0;
  size: number = 10;

  loading: boolean = false;

  constructor(
    private userService : UserControllerService
  ) {
  }

  ngOnInit(): void {
    this.findUserPaginated();
  }

  findUserPaginated(){
    this.loading = true;
    this.userService.findAllUsers({
      page: this.page,
      size: this.size
    }).subscribe(res=>{
      this.userRespone = res
      this.loading = false;
    })
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findUserPaginated();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findUserPaginated();
  }


}
