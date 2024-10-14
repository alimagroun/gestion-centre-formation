import {Component, EventEmitter, Input, OnInit, output, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ParentRequest} from "../../../../../services/models/parent-request";
import {PersonControllerService} from "../../../../../services/services/person-controller.service";

@Component({
  selector: 'app-parent-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './parent-form.component.html',
  styleUrl: './parent-form.component.scss'
})
export class ParentFormComponent implements OnInit {

  private _mother: ParentRequest = {lastName: "", phoneNumber: "", firstName: "", isDeceased: false, maritalStatus:"MARRIED", type:"MOTHER"};
  private _father: ParentRequest = {lastName: "", phoneNumber: "", firstName: "", isDeceased: false, maritalStatus:"MARRIED", type:"FATHER"};
  loadingMother= false;
  loadingFather= false;

  @Input()
  set mother(value: ParentRequest) {
    this._mother = value;
  }
  get mother(): ParentRequest {
    return this._mother;
  }

  @Input()
  set father(value: ParentRequest) {
    this._father = value;
  }
  get father(): ParentRequest {
    return this._father;
  }

  @Output() statusForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() motherRequest: EventEmitter<ParentRequest> = new EventEmitter<ParentRequest>();
  @Output() fatherRequest: EventEmitter<ParentRequest> = new EventEmitter<ParentRequest>();

  parentForm = new FormGroup({
    motherFirstName: new FormControl('', [Validators.required]),
    motherLastName: new FormControl('', [Validators.required]),
    motherEmail: new FormControl('', [Validators.email]),
    motherProfession:new FormControl('', [Validators.required]),
    motherPhoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern(/^[0-9]*$/)
    ]),

    fatherFirstName: new FormControl('', [Validators.required]),
    fatherLastName: new FormControl('', [Validators.required]),
    fatherEmail: new FormControl('', [Validators.email]),
    fatherProfession:new FormControl('', [Validators.required]),
    fatherPhoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern(/^[0-9]*$/)
    ]),

    maritalStatus: new FormControl('', [Validators.required]),
    motherDeceased: new FormControl(false),
    fatherDeceased: new FormControl(false),
  });

  constructor(
    private parentService: PersonControllerService
  ) {
    this.emitParentValue()
  }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    if (this.mother) {
      this.parentForm.patchValue({
        motherFirstName: this.mother.firstName || '',
        motherLastName: this.mother.lastName || '',
        motherEmail: this.mother.email || '',
        motherPhoneNumber: this.mother.phoneNumber || '',
        motherProfession: this.mother.profession || '',
        maritalStatus: this.mother.maritalStatus || 'MARRIED',
        motherDeceased: this.mother.isDeceased
      });
    }
    if (this.father) {
      this.parentForm.patchValue({
        fatherFirstName: this.father.firstName || '',
        fatherLastName: this.father.lastName || '',
        fatherEmail: this.father.email || '',
        fatherProfession: this.father.profession || '',
        fatherPhoneNumber: this.father.phoneNumber || '',
        fatherDeceased: this.father.isDeceased
      });
    }
  }

  emitParentValue() {
    this.parentForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this._mother.email = this.parentForm.get('motherEmail')!.value!;
        this._mother.phoneNumber = this.parentForm.get('motherPhoneNumber')!.value!;
        this._mother.firstName = this.parentForm.get('motherFirstName')!.value!;
        this._mother.lastName = this.parentForm.get('motherLastName')!.value!;
        this._mother.profession = this.parentForm.get('motherProfession')!.value!;
        this._mother.maritalStatus = this.parentForm.get('maritalStatus')!.value! as "MARRIED" | "DIVORCED";
        this._mother.isDeceased = this.parentForm.get('motherDeceased')!.value!

        this._father.email = this.parentForm.get('fatherEmail')!.value!;
        this._father.phoneNumber = this.parentForm.get('fatherPhoneNumber')!.value!;
        this._father.firstName = this.parentForm.get('fatherFirstName')!.value!;
        this._father.lastName = this.parentForm.get('fatherLastName')!.value!;
        this._father.profession = this.parentForm.get('fatherProfession')!.value!;
        this._father.maritalStatus = this.parentForm.get('maritalStatus')!.value! as "MARRIED" | "DIVORCED";
        this._father.isDeceased = this.parentForm.get('fatherDeceased')!.value!

        this.validationForm(true)
      } else {
        this.validationForm(false)
      }
    });
  }

  validationForm(status: boolean) {
    this.statusForm.emit(status);
  }

  setMotherRequeste(parent: ParentRequest) {
    this.motherRequest.emit(parent);
  }

  setFatherRequeste(parent: ParentRequest) {
    this.fatherRequest.emit(parent);
  }

  searchMotherByTel() {
    this.loadingMother = true
    let num = this.parentForm.get('motherPhoneNumber')?.value ?? '';
    this.parentService.findParentByNum({num:num, type:"MOTHER"}).subscribe(
      res => {
       this._mother = {
         lastName: res.lastName!,
         phoneNumber: res.phoneNumber!,
         firstName : res.firstName!,
         email : res.email,
         id: res.id,
         profession: res.profession,
         type: res.type!,
         maritalStatus: res.maritalStatus!,
         isDeceased: res.isDeceased!,
       }
       this.updateForm()
        this.setMotherRequeste(this._mother)
        this.loadingMother = false
      },
      error => {
        this.loadingMother = false
        this._mother.id = undefined
        console.error('Erreur lors de la recherche du parent', error);
      }
    );
  }

  searchFatherByTel() {
    this.loadingFather = true
    let num = this.parentForm.get('fatherPhoneNumber')?.value ?? '';
    this.parentService.findParentByNum({num:num, type:"FATHER"}).subscribe(
      res => {
        this._father = {
          lastName: res.lastName!,
          phoneNumber: res.phoneNumber!,
          firstName: res.firstName!,
          email: res.email,
          id: res.id,
          profession: res.profession,
          type: res.type!,
          maritalStatus: res.maritalStatus!,
          isDeceased: res.isDeceased!,
        };
        this.updateForm();
        this.setFatherRequeste(this._father);
        this.loadingFather = false
      },
      error => {
        this.loadingFather = false
        this._father.id = undefined;
        console.error('Erreur lors de la recherche du parent', error);
      }
    );
  }

}
