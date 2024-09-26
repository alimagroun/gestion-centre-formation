import {Component, OnInit} from '@angular/core';
import {FormationResponse} from "../../../../../../services/models/formation-response";
import {DomaineResponse} from "../../../../../../services/models/domaine-response";
import {FromationControllerService} from "../../../../../../services/services/fromation-controller.service";
import {DomaineControllerService} from "../../../../../../services/services/domaine-controller.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {SchoolYearResponse} from "../../../../../../services/models/school-year-response";
import {SchoolYearControllerService} from "../../../../../../services/services/school-year-controller.service";
import {ClasseFormationRequest} from "../../../../../../services/models/classe-formation-request";
import {
  ClasseFormationControllerService
} from "../../../../../../services/services/classe-formation-controller.service";


@Component({
  selector: 'app-add-classe',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './add-classe.component.html',
  styleUrl: './add-classe.component.scss'
})
export class AddClasseComponent implements OnInit{

  formationList : Array<FormationResponse> = []
  domainList :  Array<DomaineResponse> = []
  schoolYearList : Array<SchoolYearResponse> = []
  selectedFormation: any;
  selectedDomaine: any;
  selectedSchoolYear: any;
  groupNumber: any;
  classeRequest : ClasseFormationRequest = {domaineId: 0, formationId: 0, groupNumber: 0, schoolYearId: 0}
  showAlert: any;
  errorMsg = ""
  loader = false

  constructor(
    private formationService : FromationControllerService,
    private domainService: DomaineControllerService,
    private schoolYearService: SchoolYearControllerService,
    private classeService : ClasseFormationControllerService,
    private router : Router
  ) {
  }

  ngOnInit(): void {
    this.findAllFormation()
    this.findAllDomaine()
    this.findAllSchoolYear()
  }

  findAllFormation(){
    this.formationService.findAllFormationsList().subscribe(res => {
      this.formationList = res
    })
  }

  findAllDomaine(){
    this.domainService.findAllDomainsList().subscribe(res => {
      this.domainList = res
    })
  }

  findAllSchoolYear(){
    this.schoolYearService.findAllList().subscribe(res => {
      this.schoolYearList = res
    })
  }

  saveClasse() {
    this.loader = true
    if (!this.selectedFormation || !this.selectedDomaine || !this.groupNumber || !this.selectedSchoolYear) {
      this.showAlert = true;
      this.errorMsg = "Veuillez remplir tous les champs obligatoires."
      return;
    }
    this.showAlert = false;

    this.classeRequest = {
      groupNumber: this.groupNumber,
      formationId: this.selectedFormation,
      domaineId: this.selectedDomaine,
      schoolYearId: this.selectedSchoolYear
    };

    this.classeService.saveClasse({body:this.classeRequest}).subscribe(res => {
      this.loader = false
      this.router.navigate(['admin/classe']);
    },error => {
      this.loader = false
      this.showAlert = true
      this.errorMsg = "Classe existe déjà.."
    })
  }
}
