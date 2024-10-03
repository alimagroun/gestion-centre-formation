import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PageResponseSchoolYearResponse} from "../../../../services/models/page-response-school-year-response";
import {SchoolYearControllerService} from "../../../../services/services/school-year-controller.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-school-year',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './school-year.component.html',
  styleUrl: './school-year.component.scss'
})
export class SchoolYearComponent implements OnInit{

  school_years_response : PageResponseSchoolYearResponse = {}
  selectedSchoolYear: any;
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  @ViewChild('confirmModal') confirmModal!: ElementRef;

  constructor(
    private school_years_service : SchoolYearControllerService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.findAllPaginated();
  }

  findAllPaginated(){
    this.loading = true
    this.school_years_service.findAll1({page:this.page, size:this.size})
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(res=>{
      this.loading = false
      this.school_years_response = res
    })
  }


  loadPage(event: number) {
    this.page = event - 1;
    this.findAllPaginated();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10)
    this.findAllPaginated();
  }


  confirmSetAsDefault() {
    this.school_years_service.setDefault({id: this.selectedSchoolYear.id}).subscribe(res => {
      this.closeModel()
      this.findAllPaginated()
    })
  }

  closeModel(){
    this.renderer.setProperty(this.confirmModal.nativeElement, 'style', 'display: none');
    this.renderer.removeClass(this.confirmModal.nativeElement, 'show');
    this.renderer.setAttribute(this.confirmModal.nativeElement, 'aria-hidden', 'true');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
  }

}
