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
    FormsModule
  ],
  templateUrl: './parent-form.component.html',
  styleUrl: './parent-form.component.scss'
})
export class ParentFormComponent implements OnInit {

  private _mother :ParentRequest = {lastName: "", phoneNumber: "", firstName: "", type:"MOTHER", isDeceased: false, maritalStatus:"MARRIED", isChecked: false};
  private _father :ParentRequest = {lastName: "", phoneNumber: "", firstName: "", type:"FATHER", isDeceased: false, maritalStatus:"MARRIED", isChecked: false};
  loadingMother= false;
  loadingFather= false;

  @Input()
  set mother(value: ParentRequest) {
    this._mother = value;
  }
  get mother(): ParentRequest {
    return this._mother!;
  }

  @Input()
  set father(value: ParentRequest) {
    this._father = value;
  }
  get father(): ParentRequest {
    return this._father!;
  }

  @Output() statusForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() motherRequest: EventEmitter<ParentRequest> = new EventEmitter<ParentRequest>();
  @Output() fatherRequest: EventEmitter<ParentRequest> = new EventEmitter<ParentRequest>();

  parentForm = new FormGroup({
    motherFirstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherLastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherEmail: new FormControl({ value: '', disabled: true }, [Validators.email]),
    motherProfession:new FormControl({ value: '', disabled: true }, [Validators.required]),
    isMotherChecked: new FormControl(false),
    motherPhoneNumber: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern(/^[0-9]*$/)
    ]),

    fatherFirstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherLastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherEmail: new FormControl({ value: '', disabled: true }, [Validators.email]),
    fatherProfession:new FormControl({ value: '', disabled: true }, [Validators.required]),
    isFatherChecked: new FormControl(false),
    fatherPhoneNumber: new FormControl({ value: '', disabled: true }, [
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
    if (this.mother.isChecked) {
      console.log(this._mother)

      this.parentForm.get('motherFirstName')?.enable();
      this.parentForm.get('motherLastName')?.enable();
      this.parentForm.get('motherEmail')?.enable();
      this.parentForm.get('motherPhoneNumber')?.enable();
      this.parentForm.get('motherProfession')?.enable();
      this.parentForm.get('maritalStatus')?.enable();
      this.parentForm.get('motherDeceased')?.enable();

      this.parentForm.patchValue({
        motherFirstName: this.mother.firstName || '',
        motherLastName: this.mother.lastName || '',
        motherEmail: this.mother.email || '',
        motherPhoneNumber: this.mother.phoneNumber || '',
        motherProfession: this.mother.profession || '',
        maritalStatus: this.mother.maritalStatus || 'MARRIED',
        motherDeceased: this.mother.isDeceased,
        isMotherChecked: true
      });
    }
    if (this.father.isChecked) {
      console.log(this._father)
      this.parentForm.get('fatherFirstName')?.enable();
      this.parentForm.get('fatherLastName')?.enable();
      this.parentForm.get('fatherEmail')?.enable();
      this.parentForm.get('fatherPhoneNumber')?.enable();
      this.parentForm.get('fatherProfession')?.enable();
      this.parentForm.get('maritalStatus')?.enable();
      this.parentForm.get('fatherDeceased')?.enable();

      this.parentForm.patchValue({
        fatherFirstName: this.father.firstName || '',
        fatherLastName: this.father.lastName || '',
        fatherEmail: this.father.email || '',
        fatherProfession: this.father.profession || '',
        fatherPhoneNumber: this.father.phoneNumber || '',
        maritalStatus: this.mother.maritalStatus || 'MARRIED',
        fatherDeceased: this.father.isDeceased,
        isFatherChecked: true
      });
    }
  }

  emitParentValue() {
    this.parentForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this._mother!.email = this.parentForm.get('motherEmail')!.value!;
        this._mother!.phoneNumber = this.parentForm.get('motherPhoneNumber')!.value!;
        this._mother!.firstName = this.parentForm.get('motherFirstName')!.value!;
        this._mother!.lastName = this.parentForm.get('motherLastName')!.value!;
        this._mother!.profession = this.parentForm.get('motherProfession')!.value!;
        this._mother!.maritalStatus = this.parentForm.get('maritalStatus')!.value! as "MARRIED" | "DIVORCED";
        this._mother!.isDeceased = this.parentForm.get('motherDeceased')!.value!

        this._father!.email = this.parentForm.get('fatherEmail')!.value!;
        this._father!.phoneNumber = this.parentForm.get('fatherPhoneNumber')!.value!;
        this._father!.firstName = this.parentForm.get('fatherFirstName')!.value!;
        this._father!.lastName = this.parentForm.get('fatherLastName')!.value!;
        this._father!.profession = this.parentForm.get('fatherProfession')!.value!;
        this._father!.maritalStatus = this.parentForm.get('maritalStatus')!.value! as "MARRIED" | "DIVORCED";
        this._father!.isDeceased = this.parentForm.get('fatherDeceased')!.value!

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
        this._mother!.id = undefined
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
        this._father!.id = undefined;
        console.error('Erreur lors de la recherche du parent', error);
      }
    );
  }

  toggleMotherForm(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    const motherFields = [
      'motherFirstName',
      'motherEmail',
      'motherPhoneNumber',
      'motherLastName',
      'motherProfession',
    ];
    console.log(isChecked)
    motherFields.forEach(field => {
      const control = this.parentForm.get(field);
      if (isChecked) {
        control?.enable();
      } else {
        control?.reset();
        control?.disable();
      }
    });
    if(isChecked){
      this._mother!.isChecked = true
    }else{
      this._mother!.isChecked = false
    }
  }

  toggleFatherForm(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    const fatherFields = [
      'fatherFirstName',
      'fatherEmail',
      'fatherPhoneNumber',
      'fatherLastName',
      'fatherProfession',
    ];

    fatherFields.forEach(field => {
      const control = this.parentForm.get(field);
      if (isChecked) {
        control?.enable();
      } else {
        control?.reset();
        control?.disable();
      }
      if(isChecked){
        this._father!.isChecked = true
      }else{
        this._father!.isChecked = false
      }
    });
  }

}
