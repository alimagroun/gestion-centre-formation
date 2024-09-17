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

  private _parent: ParentRequest = {lastName: "", phoneNumber: "", firstName: ""};
  showMsgSearchByTel = false

  @Input()
  set parent(value: ParentRequest) {
    this._parent = value;
  }

  get parent(): ParentRequest {
    return this._parent;
  }

  @Output() statusForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() parentValidated: EventEmitter<ParentRequest> = new EventEmitter<ParentRequest>();

  parentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern(/^[0-9]*$/)
    ])
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
    if (this.parent) {
      this.parentForm.patchValue({
        firstName: this.parent.firstName || '',
        lastName: this.parent.lastName || '',
        email: this.parent.email || '',
        phoneNumber: this.parent.phoneNumber || ''
      });
    }
  }

  emitParentValue() {
    this.parentForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this._parent.email = this.parentForm.get('email')!.value!;
        this._parent.phoneNumber = this.parentForm.get('phoneNumber')!.value!;
        this._parent.firstName = this.parentForm.get('firstName')!.value!;
        this._parent.lastName = this.parentForm.get('lastName')!.value!;
        this.validationForm(true)
      } else {
        this.validationForm(false)
      }
    });
  }

  validationForm(status: boolean) {
    this.statusForm.emit(status);
  }

  setParentValidate(parent: ParentRequest) {
    this.parentValidated.emit(parent);
  }

  searchByTel() {
    this.showMsgSearchByTel = false
    let num = this.parentForm.get('phoneNumber')?.value ?? '';
    this.parentService.findParentByNum({num}).subscribe(
      res => {
       this._parent = {
         lastName: res.lastName!,
         phoneNumber: res.phoneNumber!,
         firstName : res.firstName!,
         email : res.email,
         id: res.id,
         profession: res.profession
       }
       this.updateForm()
        this.setParentValidate(this._parent)
        this.showMsgSearchByTel = true
      },
      error => {
        this.showMsgSearchByTel = false
        console.error('Erreur lors de la recherche du parent', error);
      }
    );
  }
}
