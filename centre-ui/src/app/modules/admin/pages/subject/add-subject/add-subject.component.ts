import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpecialtyControllerService} from "../../../../../services/services/specialty-controller.service";
import {SpecialtyResponse} from "../../../../../services/models/specialty-response";
import {NgForOf, NgIf} from "@angular/common";
import {SubjectRequest} from "./SubjectRequest";
import {SubjectControllerService} from "../../../../../services/services/subject-controller.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../../services/toast/toast.service";

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.scss'
})
export class AddSubjectComponent implements OnInit {

  specialtyList: Array<SpecialtyResponse> = []
  subjectRequest: SubjectRequest = {
    description: "",
    practicalHours: 0,
    specialtyId: 0,
    theoreticalHours: 0,
    totalHours: 0,
    name: ""
  }

  selectedFile: File | null = null;
  isLoading = false;

  subjectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.minLength(5)]),
    totalHours: new FormControl('', [Validators.required]),
    theoreticalHours: new FormControl(''),
    practicalHours: new FormControl(''),
    specialtyId: new FormControl('', [Validators.required]),
    pdfFile: new FormControl(null),
  });

  constructor(
    private specialityService: SpecialtyControllerService,
    private subjectService: SubjectControllerService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.getAllSpecialty()
  }

  onSubmit() {
    this.isLoading = true;

    this.subjectRequest = {
      name: this.subjectForm.get('name')?.value ?? "",
      description: this.subjectForm.get('description')?.value ?? "",
      totalHours: Number(this.subjectForm.get('totalHours')?.value) || 0,
      theoreticalHours: Number(this.subjectForm.get('theoreticalHours')?.value) || 0,
      practicalHours: Number(this.subjectForm.get('practicalHours')?.value) || 0,
      specialtyId: Number(this.subjectForm.get('specialtyId')?.value) || 0
    };

    const requestBody = {
      body: {
        subject: JSON.stringify(this.subjectRequest),
        file: this.selectedFile!
      }
    };

    this.subjectService.createSubject(requestBody).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastService.showSuccess("Enregistré avec succès");
        this.router.navigate(['/admin/subjects']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error.errorMessage == "DUPLICATE_FOUND") {
          if (error.error.errorDescription == "subject_name_exists") {
            this.toastService.showError("Ce nom de sujet existe déjà");
          }
        }
      }
    });

  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  getAllSpecialty() {
    this.specialityService.findAll().subscribe(res => {
      this.specialtyList = res
    })
  }
  
}
