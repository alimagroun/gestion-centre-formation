import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpecialtyControllerService} from "../../../../../services/services/specialty-controller.service";
import {SpecialtyResponse} from "../../../../../services/models/specialty-response";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-specialty-form',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './specialty-form.component.html',
  styleUrl: './specialty-form.component.scss'
})
export class SpecialtyFormComponent implements OnInit{

  specialtyList : Array<SpecialtyResponse> = []

  @Input()
  selectedSpecialty: SpecialtyResponse | undefined = {}

  @Output()
  specialtySelected = new EventEmitter<SpecialtyResponse>();
  onSpecialtyChange() {
    if (this.selectedSpecialty) {
      this.specialtySelected.emit(this.selectedSpecialty);
    }
  }

  constructor(
    private specialtyService : SpecialtyControllerService
  ) {
  }

  ngOnInit(): void {
    this.findAllSpecialty()
  }

  findAllSpecialty(){
    this.specialtyService.findAll().subscribe(res => {
      this.specialtyList = res
      this.selectedSpecialty = this.specialtyList.find(specialty => specialty.id === this.selectedSpecialty!.id);
    })
  }



}
