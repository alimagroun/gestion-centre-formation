import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {DomaineRequest} from "../../../../../../services/models/domaine-request";
import {DomaineControllerService} from "../../../../../../services/services/domaine-controller.service";

@Component({
  selector: 'app-add-domain',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './add-domain.component.html',
  styleUrl: './add-domain.component.scss'
})
export class AddDomainComponent {

  domaineRequest: DomaineRequest = {name: '', description: ''}
  validationErrors: { [key: string]: string } = {};
  error= ""
  loading = false

  constructor(
    private domainService: DomaineControllerService,
    private router: Router
  ) {
  }

  add() {
    this.loading = true
    this.domainService.saveDomain({body: this.domaineRequest}).subscribe(res => {
        this.router.navigate(['admin/domain']);
      }, error => {
        this.loading = false
        const messages: { [key: string]: string } = {
          'DESCRIPTION_NOT_NULL': 'Description requis.',
          'NAME_NOT_NULL': 'Nom requis.',
        };

        if (error.error.validationErrors) {
          error.error.validationErrors.forEach((error: string) => {
            const message = messages[error];
            if (error.includes('DESCRIPTION')) {
              this.validationErrors['description'] = message;
            } else if (error.includes('NAME')) {
              this.validationErrors['name'] = message;
            }
          });
        }
        console.log(error.error)
        if (error.error) {
          if(error.error.errorMessage == "DUPLICATE_FOUND")
            this.error = "Domaine existe déjà";
        }
      }
    )
  }

  clearError(field: string) {
    if (this.validationErrors[field]) {
      delete this.validationErrors[field];
    }
  }

}
