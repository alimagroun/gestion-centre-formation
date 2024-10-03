import { Component } from '@angular/core';
import {FormationTypeResponse} from "../../../../../../services/models/formation-type-response";
import {DomaineResponse} from "../../../../../../services/models/domaine-response";
import {DomaineControllerService} from "../../../../../../services/services/domaine-controller.service";
import {Router, RouterLink} from "@angular/router";
import {FromationControllerService} from "../../../../../../services/services/fromation-controller.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SpecialtyControllerService} from "../../../../../../services/services/specialty-controller.service";
import {SpecialtyRequest} from "../../../../../../services/models/specialty-request";
import {ToastService} from "../../../../../../services/toast/toast.service";

@Component({
  selector: 'app-add-specialty',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './add-specialty.component.html',
  styleUrl: './add-specialty.component.scss'
})
export class AddSpecialtyComponent {

  formationList : Array<FormationTypeResponse> = []
  domainList :  Array<DomaineResponse> = []

  specialtyRequest : SpecialtyRequest = {domaineId:0 ,formationTypeId:0 }
  selectedFormation: any;
  selectedDomaine: any;

  showAlert: any;
  errorMsg = ""
  loader = false

  constructor(
    private formationService : FromationControllerService,
    private domainService: DomaineControllerService,
    private specialtyService: SpecialtyControllerService,
    private toastService: ToastService,
    private router : Router,
  ) {
  }

  ngOnInit(): void {
    this.findAllFormation()
    this.findAllDomaine()
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

  save() {
    this.loader = true
    this.specialtyRequest = {
      domaineId: this.selectedDomaine,
      formationTypeId: this.selectedFormation,
    }
    this.specialtyService.saveSpecialty({body:this.specialtyRequest}).subscribe(res => {
      this.toastService.showSuccess("Ajouté avec succès");
      this.router.navigate(['/admin/specialty'])
    }, error => {
      if(error.error.errorMessage == "DUPLICATE_FOUND"){
        this.toastService.showError("Cette spécialité existe déjà");
      }
      this.loader = false
    })

  }
}
