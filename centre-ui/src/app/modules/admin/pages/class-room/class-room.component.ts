import {Component, OnInit} from '@angular/core';
import {PageResponseClassroomResponse} from "../../../../services/models/page-response-classroom-response";
import {ClassroomControllerService} from "../../../../services/services/classroom-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-class-room',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './class-room.component.html',
  styleUrl: './class-room.component.scss'
})
export class ClassRoomComponent implements OnInit {

  classRoomResponse: PageResponseClassroomResponse = {};
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(private classRoomService: ClassroomControllerService) {

  }

  ngOnInit(): void {
    this.getClassRoomsPaginated()
  }

  getClassRoomsPaginated() {
    this.classRoomService.getClassroomsPaginated({page: this.page, size: this.size}).subscribe(data => {
      this.classRoomResponse = data;
    })
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.getClassRoomsPaginated();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.getClassRoomsPaginated();
  }

}
