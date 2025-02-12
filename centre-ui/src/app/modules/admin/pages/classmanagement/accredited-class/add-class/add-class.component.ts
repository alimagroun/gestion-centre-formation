import {Component} from '@angular/core';
import {FormationTypeResponse} from "../../../../../../services/models/formation-type-response";
import {DomaineResponse} from "../../../../../../services/models/domaine-response";
import {SchoolYearResponse} from "../../../../../../services/models/school-year-response";
import {SpecialtyResponse} from "../../../../../../services/models/specialty-response";
import {SchoolYearControllerService} from "../../../../../../services/services/school-year-controller.service";
import {
  ClasseFormationControllerService
} from "../../../../../../services/services/classe-formation-controller.service";
import {Router, RouterLink} from "@angular/router";
import {SpecialtyControllerService} from "../../../../../../services/services/specialty-controller.service";
import {AccreditedClassRequest} from "../../../../../../services/models/accredited-class-request";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ToastService} from "../../../../../../services/toast/toast.service";

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.scss'
})
export class AddClassComponent {

  specialtyList: Array<SpecialtyResponse> = []
  schoolYearList: Array<SchoolYearResponse> = []
  selectSpecialty: any;
  selectedSchoolYear: any;
  groupNumber: any;
  classeRequest: AccreditedClassRequest = {specialtyId: 0, groupNumber: 0, schoolYearId: 0}
  loader = false
  selectedClassLevel: any;

  constructor(
    private specialtyService: SpecialtyControllerService,
    private schoolYearService: SchoolYearControllerService,
    private classeService: ClasseFormationControllerService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllSpecialty()
    this.findAllSchoolYear()
  }

  findAllSpecialty() {
    this.specialtyService.findAll().subscribe(res => {
      this.specialtyList = res
    })
  }

  findAllSchoolYear() {
    this.schoolYearService.findAllList().subscribe(res => {
      this.schoolYearList = res
    })
  }

  saveClasse() {
    this.loader = true
    if (!this.selectSpecialty || !this.selectedClassLevel || !this.groupNumber || !this.selectedSchoolYear) {
      this.toastService.showError("Veuillez remplir tous les champs obligatoires.")
      this.loader = false
      return;
    }

    this.classeRequest = {
      groupNumber: this.groupNumber,
      specialtyId: this.selectSpecialty,
      schoolYearId: this.selectedSchoolYear,
      yearLevel: this.selectedClassLevel
    };

    this.classeService.saveAccreditedClass({body: this.classeRequest}).subscribe(res => {
      this.toastService.showSuccess("Ajouter avec succée")
      this.router.navigate(['admin/accreditedClass']);
    }, error => {
      this.loader = false
      this.toastService.showError("Classe existe déjà.")
    })
  }
}
