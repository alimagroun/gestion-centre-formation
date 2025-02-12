import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {FromationControllerService} from "../../../../../../services/services/fromation-controller.service";
import {FormationTypeRequest} from "../../../../../../services/models/formation-type-request";

@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.scss'
})
export class AddFormationComponent {

  formationRequest: FormationTypeRequest = {name: '', description: ''}
  validationErrors: { [key: string]: string } = {};
  error = ""
  loading = false

  constructor(
    private formationService: FromationControllerService,
    private router: Router
  ) {
  }

  add() {
    this.loading = true
    this.formationService.saveFormation({body: this.formationRequest}).subscribe(res => {
        this.router.navigate(['admin/formation']);
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
          if (error.error.errorMessage == "DUPLICATE_FOUND")
            this.error = "Formation existe déjà";
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
