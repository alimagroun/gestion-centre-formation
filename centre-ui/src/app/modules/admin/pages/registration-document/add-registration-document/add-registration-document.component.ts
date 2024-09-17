import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DocumentsControllerService} from "../../../../../services/services/documents-controller.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {DocumentRequest} from "../../../../../services/models/document-request";

@Component({
  selector: 'app-add-registration-document',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './add-registration-document.component.html',
  styleUrl: './add-registration-document.component.scss'
})
export class AddRegistrationDocumentComponent {

  document: DocumentRequest = {name: '', description: ''}
  errors: { [key: string]: string } = {};
  loading = false

  constructor(
    private documentService: DocumentsControllerService,
    private router: Router
  ) {
  }

  add() {
    this.loading = true
    this.documentService.saveDocument({body: this.document}).subscribe(res => {
        this.router.navigate(['admin/registrationDocument']);
      }, error => {
        this.loading = false
        const messages: { [key: string]: string } = {
          'DOCUMENT_DESCRIPTION_REQUIRED': 'Description requis.',
          'DOCUMENT_NAME_REQUIRED': 'Nom requis.'
        };

        error.error.validationErrors.forEach((error: string) => {
          const message = messages[error];
          if (error.includes('DESCRIPTION')) {
            this.errors['description'] = message;
          } else if (error.includes('NAME')) {
            this.errors['name'] = message;
          }
        });
      }
    )
  }

  clearError(field: string) {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

}
