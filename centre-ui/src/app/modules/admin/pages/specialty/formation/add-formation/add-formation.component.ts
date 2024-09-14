import {Component} from '@angular/core';
import {FormationRequest} from "../../../../../../services/models/formation-request";
import {Router, RouterLink} from "@angular/router";
import {FormationControllerService} from "../../../../../../services/services/formation-controller.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

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

  formationRequest: FormationRequest = {name: '', description: ''}
  validationErrors: { [key: string]: string } = {};
  error: Array<string> = []
  loading = false

  constructor(
    private formationService: FormationControllerService,
    private router: Router
  ) {
  }

  add() {
    this.loading = true
    this.formationService.createFormation({body: this.formationRequest}).subscribe(res => {
        this.router.navigate(['admin/formation']);
      }, error => {
        this.loading = false
        const messages: { [key: string]: string } = {
          'DESCRIPTION_REQUIRED': 'Description requis.',
          'NAME_REQUIRED': 'Nom requis.',
          'FORMATION_ALREADY_EXISTS': 'La formation existe déjà'
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

        if (error.error.error) {
          this.error = error.error.error;
          console.log(this.error)
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
