import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {RegistrationControllerService} from "../../../../../services/services/registration-controller.service";
import {RegistrationDetailsResponse} from "../../../../../services/models/registration-details-response";
import {DocumentsControllerService} from "../../../../../services/services/documents-controller.service";
import {DocumentResponse} from "../../../../../services/models/document-response";
import { forkJoin } from 'rxjs';
import {ToastService} from "../../../../../services/toast/toast.service";

@Component({
  selector: 'app-registration-details',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './registration-details.component.html',
  styleUrl: './registration-details.component.scss'
})
export class RegistrationDetailsComponent implements OnInit{

  registration : RegistrationDetailsResponse = {}
  documents : Array<DocumentResponse> = []
  remainingDocuments : Array<DocumentResponse> = []
  selectedDocument : DocumentResponse = {}
  registrationId : number = 0
  loader = false
  constructor(
    private registrationService : RegistrationControllerService,
    private documentService : DocumentsControllerService,
    private route: ActivatedRoute,
    private toastService : ToastService
  ) {
  }

  async ngOnInit() {
    this.registrationId = Number(this.route.snapshot.paramMap.get('id'));
    await this.findRegistrationAndDocuments();
  }

  async findRegistrationAndDocuments() {
    try {
      const registrationResponse = await this.registrationService.findRegistrationById({ id: this.registrationId }).toPromise();
      this.registration = registrationResponse!;

      const documentsResponse = await this.documentService.findAllDocuments().toPromise();
      this.documents = documentsResponse!;

      this.remainingDocuments = this.documents.filter(doc => {
        return !this.registration?.documentRegistrationResponseList?.some(d => d.id === doc.id);
      });
    } catch (error) {
      console.error("Error fetching registration and documents:", error);
    }
  }

  findRegistrationById(){
    this.registrationService.findRegistrationById({id :this.registrationId}).subscribe(res=>{
      this.registration = res
    })
  }

  findAllDocuments(){
    this.documentService.findAllDocuments().subscribe(res=>{
      this.documents = res
    })
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'IN_PROGRESS':
        return 'En cours';
      case 'COMPLETED':
        return 'Terminé';
      case 'CANCELLED':
        return 'Annulé';
      default:
        return status;
    }
  }


  addDocumentToRegistration() {
    this.loader = true
    this.registrationService.addDocumentToRegistration({
      registrationId: this.registrationId,
      documentId: this.selectedDocument.id!
    }).subscribe(res => {
      this.loader = false
      this.toastService.showSuccess("Ajouté avec succès");
      this.findRegistrationAndDocuments();
    })
  }

  addDocumentSelected(document: DocumentResponse) {
    this.selectedDocument = document;
  }
}
