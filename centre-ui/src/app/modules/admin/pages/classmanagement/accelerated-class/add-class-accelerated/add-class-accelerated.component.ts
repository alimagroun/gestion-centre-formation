import {Component} from '@angular/core';
import {SpecialtyResponse} from "../../../../../../services/models/specialty-response";
import {SpecialtyControllerService} from "../../../../../../services/services/specialty-controller.service";
import {
  ClasseFormationControllerService
} from "../../../../../../services/services/classe-formation-controller.service";
import {ToastService} from "../../../../../../services/toast/toast.service";
import {Router, RouterLink} from "@angular/router";
import {AcceleratedClassRequest} from "../../../../../../services/models/accelerated-class-request";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-class-accelerated',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './add-class-accelerated.component.html',
  styleUrl: './add-class-accelerated.component.scss'
})
export class AddClassAcceleratedComponent {

  specialtyList: Array<SpecialtyResponse> = []
  selectSpecialty: any;
  groupNumber: any;
  classRequest: AcceleratedClassRequest = {specialtyId: 0, groupNumber: 0, startDate: "", endDate: ""}
  loader = false

  constructor(
    private specialtyService: SpecialtyControllerService,
    private classService: ClasseFormationControllerService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllSpecialty()
  }

  findAllSpecialty() {
    this.specialtyService.findAll().subscribe(res => {
      this.specialtyList = res
    })
  }


  saveClasse() {
    this.loader = true
    if (!this.selectSpecialty || !this.classRequest.startDate || !this.classRequest.endDate || !this.groupNumber) {
      this.toastService.showError("Veuillez remplir tous les champs obligatoires.")
      this.loader = false
      return;
    }
    if (this.classRequest.startDate > this.classRequest.endDate) {
      this.toastService.showError("Date de fin doit être supérieure ou égale à date de début")
      this.loader = false
      return;
    }
    this.classRequest.groupNumber = this.groupNumber
    this.classRequest.specialtyId = this.selectSpecialty

    this.classService.saveAcceleratedClass({body: this.classRequest}).subscribe(res => {
      this.toastService.showSuccess("Ajouter avec succée")
      this.router.navigate(['admin/acceleratedClass']);
    }, error => {
      this.loader = false
      this.toastService.showError("Classe existe déjà.")
    })
  }
}
