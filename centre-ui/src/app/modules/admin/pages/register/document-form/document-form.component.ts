import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentsControllerService} from "../../../../../services/services/documents-controller.service";
import {DocumentResponse} from "../../../../../services/models/document-response";
import {PageResponseDocumentResponse} from "../../../../../services/models/page-response-document-response";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-document-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './document-form.component.html',
  styleUrl: './document-form.component.scss'
})
export class DocumentFormComponent implements OnInit {

  pageDocument: PageResponseDocumentResponse = {}
  documents: Array<DocumentResponse> = []

  @Input()
  registrationFeesAmount = 0

  loader = false
  @Input()
  listDocumentsSelected: Array<DocumentResponse> = [];
  selectedDocumentIds: number[] = [];

  @Output() registrationFeesChange = new EventEmitter<number>();

  onFeesAmountChange(): void {
    this.registrationFeesChange.emit(this.registrationFeesAmount);
  }

  @Output() listIdDocument: EventEmitter<Array<DocumentResponse>> = new EventEmitter<Array<DocumentResponse>>();

  outputListIdDocument(documents: Array<DocumentResponse>) {
    this.listIdDocument.emit(documents);
  }


  constructor(
    private documentService: DocumentsControllerService
  ) {
  }

  findAll() {
    this.loader = true
    this.documentService.findAllDocuments().subscribe(res => {
      this.documents = res
      this.loader = false
    })
  }

  ngOnInit(): void {
    this.findAll()
    this.selectedDocumentIds = this.listDocumentsSelected.map(doc => doc.id!);
  }

  isDocumentChecked(docId: number): boolean {
    return this.selectedDocumentIds.includes(docId);
  }

  onCheckboxChange(event: any, doc: DocumentResponse) {
    if (event.target.checked) {
      this.selectedDocumentIds.push(doc.id!);
      this.listDocumentsSelected.push(doc)
    } else {
      const index = this.listDocumentsSelected.findIndex(selectedDoc => selectedDoc.id === doc.id);
      if (index > -1) {
        this.listDocumentsSelected.splice(index, 1);
      }
    }
    this.outputListIdDocument(this.listDocumentsSelected)
  }

}
