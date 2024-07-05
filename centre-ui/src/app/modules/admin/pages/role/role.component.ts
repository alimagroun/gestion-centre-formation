import {Component, OnInit} from '@angular/core';
import {RoleControllerService} from "../../../../services/services/role-controller.service";
import {RoleResponse} from "../../../../services/models/role-response";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {PageResponseRoleResponse} from "../../../../services/models/page-response-role-response";

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    NgIf
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {
  roleResponse: PageResponseRoleResponse = {};
  page: number = 0;
  size: number = 10;

  loading: boolean = false;

  constructor(private roleService: RoleControllerService) {}

  ngOnInit(): void {
    this.findRolePaginated();
  }

  findRolePaginated() {
    this.loading = true;
    this.roleResponse.content = []
    this.roleService.findAll({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.roleResponse = res;
      this.loading = false;
    });
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findRolePaginated();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10); // Convertir en nombre entier
    this.findRolePaginated();
  }
}
