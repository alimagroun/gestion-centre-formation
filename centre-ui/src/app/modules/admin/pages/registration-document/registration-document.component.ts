import {Component} from '@angular/core';
import {DocumentResponse} from "../../../../services/models/document-response";
import {DocumentsControllerService} from "../../../../services/services/documents-controller.service";
import {PageResponseDocumentResponse} from "../../../../services/models/page-response-document-response";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration-document',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './registration-document.component.html',
  styleUrl: './registration-document.component.scss'
})
export class RegistrationDocumentComponent {

  document: PageResponseDocumentResponse = {}
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(
    private documentService: DocumentsControllerService
  ) {
  }

  ngOnInit(): void {
    this.findAllDocuments();
  }

  findAllDocuments() {
    this.loading = true;
    this.document.content = []
    this.documentService.findAllDocumentsPageable({
      page: this.page,
      size: this.size
    }).subscribe(res => {
      this.document = res;
      this.loading = false;
    });
  }

  loadPage(event: number) {
    this.page = event - 1;
    this.findAllDocuments();
  }

  changePageSize(event: any) {
    this.size = parseInt(event.target.value, 10);
    this.findAllDocuments();
  }

}
