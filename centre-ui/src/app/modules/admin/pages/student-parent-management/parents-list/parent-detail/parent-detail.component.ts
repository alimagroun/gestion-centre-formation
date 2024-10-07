import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParentDetailResponse} from "../../../../../../services/models/parent-detail-response";
import {PersonControllerService} from "../../../../../../services/services/person-controller.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-parent-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './parent-detail.component.html',
  styleUrl: './parent-detail.component.scss'
})
export class ParentDetailComponent implements OnInit{

  parentId: string | null = null;
  parent : ParentDetailResponse = {}
  loading= true;

  constructor(
    private route: ActivatedRoute,
    private parentService : PersonControllerService
    ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.parentId = params.get('id');
    });
    this.getParentDetail()
  }

  getParentDetail(){
    this.parentService.findParentDetailById({parentId:Number(this.parentId)}).subscribe(res => {
      this.loading = false
      this.parent = res
    })
  }

}
