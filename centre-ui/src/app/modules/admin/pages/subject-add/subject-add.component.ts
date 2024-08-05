import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SubjectControllerService} from "../../../../services/services/subject-controller.service"; // Adjust the path as needed
import { HttpContext } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Subject} from "../../../../services/models/subject";


@Component({
  selector: 'app-subject-add',
  standalone: true,
  imports: [],
  templateUrl: './subject-add.component.html',
  styleUrl: './subject-add.component.scss'
})
export class SubjectAddComponent {
  subjectForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectControllerService
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      file: [null] // File field
    });
  }

  onSubmit() {
    if (this.subjectForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = new FormData();
    const subjectData: Subject = {
      name: this.subjectForm.get('name')?.value,
      description: this.subjectForm.get('description')?.value
    };
    
    formData.append('subject', JSON.stringify(subjectData));
    
    // Append file if selected
    const file = this.subjectForm.get('file')?.value;
    if (file) {
      formData.append('file', file);
    }

    const params: SaveSubject$Params = {
      body: formData as any // Type assertion to any, because the generated code expects a specific structure
    };

    this.subjectService.saveSubject(params, new HttpContext()).pipe(
      map((response) => {
        // Handle successful response
        this.loading = false;
        // Handle success, e.g., show a success message or redirect
      }),
      catchError((error) => {
        // Handle error response
        this.loading = false;
        this.error = 'An error occurred while saving the subject.';
        return of(null); // Return an empty observable to complete the stream
      })
    ).subscribe();
  }
}
