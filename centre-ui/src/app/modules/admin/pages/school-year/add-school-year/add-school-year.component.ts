import {Component} from '@angular/core';
import {SchoolYearRequest} from "../../../../../services/models/school-year-request";
import {Router, RouterLink} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {SchoolYearControllerService} from "../../../../../services/services/school-year-controller.service";

@Component({
  selector: 'app-add-school-year',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-school-year.component.html',
  styleUrl: './add-school-year.component.scss'
})
export class AddSchoolYearComponent {

  schoolYearRequest: SchoolYearRequest = {startYear: 0, endYear: 0};
  errorMsg: string = ""

  //validator
  schoolYearForm = new FormGroup({
    startYear: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/)
    ]),
    endYear: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ])
  });

  constructor(
    private schoolYearService: SchoolYearControllerService,
    private router: Router
  ) {
  }

  onSubmit() {
    if (this.schoolYearForm.valid) {
      const startYear = this.schoolYearForm.get('startYear')?.value;
      const endYear = this.schoolYearForm.get('endYear')?.value;
      if (endYear! < startYear! || startYear! + 1 != endYear!) {
        this.errorMsg = "L'année de fin doit être égale à l'année de début +1.";
      } else {
        this.schoolYearRequest = {startYear: Number(startYear), endYear: Number(endYear)};
        this.schoolYearService.save(
          {body: this.schoolYearRequest}
        ).subscribe(res => {
          this.router.navigate(['admin/school-year']);
        }, error => {
          if (error.error.errorMessage == "DUPLICATE_FOUND") {
            this.errorMsg = "Un enregistrement similaire existe déjà. Veuillez vérifier les informations et réessayer."
          }
        })
      }
    }
  }

}
