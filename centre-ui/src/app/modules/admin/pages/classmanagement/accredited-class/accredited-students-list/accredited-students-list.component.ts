import {Component} from '@angular/core';
import {ClassStudentResponse} from "../../../../../../services/models/class-student-response";
import {ActivatedRoute} from "@angular/router";
import {
  ClasseFormationControllerService
} from "../../../../../../services/services/classe-formation-controller.service";
import {NgForOf, NgIf} from "@angular/common";
import {PersonControllerService} from "../../../../../../services/services/person-controller.service";
import {ToastService} from "../../../../../../services/toast/toast.service";
import {StudentAllResponse} from "../../../../../../services/models/student-all-response";
import {NgSelectComponent} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {finalize} from "rxjs";

@Component({
  selector: 'app-accredited-students-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgSelectComponent,
    FormsModule
  ],
  templateUrl: './accredited-students-list.component.html',
  styleUrl: './accredited-students-list.component.scss'
})
export class AccreditedStudentsListComponent {

  classId: string | null = null;
  classStudentResponses: Array<ClassStudentResponse> = [];
  studentsList: Array<StudentAllResponse> = [];
  isLoading: boolean = true;
  selectedStudentId: number | null = null;
  loader = false;
  loading: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private classService: ClasseFormationControllerService,
    private studentService: PersonControllerService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.classId = this.activatedRoute.snapshot.paramMap.get('id');
    this.findAllStudentByClass();
    this.findAllStudent()
  }

  findAllStudentByClass() {
    if (this.classId) {
      this.classService.findAllStudentByAccreditedClassId(
        {classId: Number(this.classId)}
      ).subscribe(students => {
        this.classStudentResponses = students;
        this.isLoading = false;
      });
    }
  }

  findAllStudent() {
    this.studentService.getAllStudents().subscribe(students => {
      this.studentsList = students;
    })
  }

  addStudentToClass() {
    this.loader = true
    if (this.selectedStudentId == null) {
      this.toastService.showError("Veuillez sélectionner un étudiant avant de l'ajouter à la classe.");
      this.loader = false
      return;
    }
    this.classService.addStudentToAccreditedClass(
      {
        studentId: this.selectedStudentId!,
        accreditedClassId: Number(this.classId)
      }
    ).subscribe(res => {
      this.toastService.showSuccess("Ajouté avec succès")
      this.loader = false
      this.findAllStudentByClass()
    }, error => {
      this.loader = false
      if (error.error.errorMessage == "DUPLICATE_FOUND") {
        this.toastService.showError("L'étudiant est déjà inscrit dans cette classe")
      }
    })
  }

  exportToPDF() {
    this.loading = true;
    this.classService.exportClassStudentsAsPdf(
      {
        classId: Number(this.classId),
        isAccelerated: false,
        isAccredited: true
      }
    )
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
        },
        error: (err) => {
          console.error("Erreur lors du téléchargement du PDF", err);
        }
      });
  }

}
