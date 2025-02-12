import {Component, OnInit} from "@angular/core";
import {ClassroomRequest} from "../../../../../services/models/classroom-request";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ClassroomControllerService} from "../../../../../services/services/classroom-controller.service";
import {ToastService} from "../../../../../services/toast/toast.service";
import {Router} from "@angular/router";

enum ClassroomType {
  CLASSROOM = 'CLASSROOM',
  LAB_ROOM = 'LAB_ROOM'
}

@Component({
  selector: 'app-add-class-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-class-room.component.html',
  styleUrl: './add-class-room.component.scss'
})
export class AddClassRoomComponent implements OnInit {

  classRoom: ClassroomRequest = {name: "", type: "CLASSROOM"};
  classroomTypes = Object.values(ClassroomType);
  isLoading = false

  classRoomForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type: new FormControl('', Validators.required)
  });

  constructor(
    private classRoomService: ClassroomControllerService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.classRoomForm.valid) {
      this.classRoom = {
        name: this.classRoomForm.get('name')?.value!,
        type: this.classRoomForm.get('type')?.value as ClassroomType
      };
      this.classRoomService.saveClassroom({body: this.classRoom}).subscribe({
        next: (value) => {
          this.isLoading = false;
          if (value.success) {
            this.toastService.showSuccess("Ajouté avec succès");
            this.router.navigate(['admin/classrooms']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 409) {
            this.toastService.showError("Cette salle existe déjà !");
          } else {
            this.toastService.showError("Erreur lors de l'ajout !");
          }
        }
      });
    }
  }

}
