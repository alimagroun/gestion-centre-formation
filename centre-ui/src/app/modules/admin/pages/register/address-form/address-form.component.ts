import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ParentRequest} from "../../../../../services/models/parent-request";
import {AddressRequest} from "../../../../../services/models/address-request";

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit {

  private _address: AddressRequest = {};

  @Input()
  set address(value: AddressRequest) {
    this._address = value;
  }
  get address(): AddressRequest {
    return this._address;
  }

  @Output() statusForm: EventEmitter<boolean> = new EventEmitter<boolean>();



  addressForm = new FormGroup({
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.emitParentValue()
  }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    if (this.address) {
      this.addressForm.patchValue({
        city: this.address.city || '',
        street: this.address.street || '',
        zipCode: this.address.zipCode || '',
      });
    }
  }

  emitParentValue() {
    this.addressForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this._address.city = this.addressForm.get('city')!.value!;
        this._address.street = this.addressForm.get('street')!.value!;
        this._address.zipCode = this.addressForm.get('zipCode')!.value!;
        this.validationForm(true)
      }else{
        this.validationForm(false)
      }
    });
  }
  validationForm(status : boolean) {
    this.statusForm.emit(status);
  }
}
