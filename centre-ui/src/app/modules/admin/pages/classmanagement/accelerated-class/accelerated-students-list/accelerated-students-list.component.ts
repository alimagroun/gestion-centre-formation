import {Component, OnInit} from '@angular/core';
import {
  ClasseFormationControllerService
} from "../../../../../../services/services/classe-formation-controller.service";
import {ActivatedRoute} from "@angular/router";
import {ClassStudentResponse} from "../../../../../../services/models/class-student-response";
import {NgForOf, NgIf} from "@angular/common";
import {PersonControllerService} from "../../../../../../services/services/person-controller.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {StudentAllResponse} from "../../../../../../services/models/student-all-response";
import {ToastService} from "../../../../../../services/toast/toast.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-accelerated-students-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgSelectModule,
    FormsModule
  ],
  templateUrl: './accelerated-students-list.component.html',
  styleUrl: './accelerated-students-list.component.scss'
})
export class AcceleratedStudentsListComponent implements OnInit {

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
      this.classService.findAllStudentByAcceleratedClassId(
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
      console.log(students)
    })
  }

  addStudentToClass() {
    this.loader = true
    if (this.selectedStudentId == null) {
      this.toastService.showError("Veuillez sélectionner un étudiant avant de l'ajouter à la classe.");
      this.loader = false
      return;
    }
    this.classService.addStudentToAcceleratedClass(
      {
        studentId: this.selectedStudentId!,
        acceleratedClassId: Number(this.classId)
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
        isAccelerated: true,
        isAccredited: false
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
