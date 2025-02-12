import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StudentRequest} from "../../../../../services/models/student-request";
import {ParentRequest} from "../../../../../services/models/parent-request";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {

  private _student: StudentRequest = {firstName: "", lastName: "", levelOfEducation: "", phoneNumber: ""};

  @Input()
  set student(value: StudentRequest) {
    this._student = value;
  }

  get student(): StudentRequest {
    return this._student;
  }

  @Output() statusForm: EventEmitter<boolean> = new EventEmitter<boolean>();


  studentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    levelOfEducation: new FormControl('', [Validators.required]),
    identityNumber: new FormControl(''),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern(/^[0-9]*$/)
    ])
  });

  constructor() {
    this.emitStudentValue()
  }

  private emitStudentValue() {
    this.studentForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this._student.email = this.studentForm.get('email')!.value!;
        this._student.phoneNumber = this.studentForm.get('phoneNumber')!.value!;
        this._student.firstName = this.studentForm.get('firstName')!.value!;
        this._student.lastName = this.studentForm.get('lastName')!.value!;
        this._student.levelOfEducation = this.studentForm.get('levelOfEducation')!.value!;
        this._student.identityNumber = this.studentForm.get("identityNumber")?.value!
        this.validationForm(true)
      } else {
        this.validationForm(false)
      }
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    if (this._student) {
      this.studentForm.patchValue({
        firstName: this._student.firstName || '',
        lastName: this._student.lastName || '',
        email: this._student.email || '',
        phoneNumber: this._student.phoneNumber || '',
        levelOfEducation: this._student.levelOfEducation || '',
        identityNumber: this._student.identityNumber || '',
      });
    }
  }

  validationForm(status: boolean) {
    this.statusForm.emit(status);
  }
}
