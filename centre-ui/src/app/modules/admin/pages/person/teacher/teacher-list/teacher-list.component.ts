import {Component} from '@angular/core';
import {PageResponseTeacherResponse} from "../../../../../../services/models/page-response-teacher-response";
import {PersonControllerService} from "../../../../../../services/services/person-controller.service";
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss'
})
export class TeacherListComponent {

  teacherPaged: PageResponseTeacherResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private personService: PersonControllerService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getTeacherPaged();
  }

  getTeacherPaged() {
    this.loading = true;
    this.teacherPaged.content = []
    this.personService.findAllTeachersPaged({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.teacherPaged = res;
      this.loading = false;
    });
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.getTeacherPaged();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.getTeacherPaged();
  }

}
