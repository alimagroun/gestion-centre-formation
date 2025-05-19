import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {PersonalInfoComponent} from "./pages/personal-info/personal-info.component";
import {authStudentGuard} from "../../services/guard/auth-student.guard";
import {StudentClassInfoComponent} from "./pages/student-class-info/student-class-info.component";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    canActivate: [authStudentGuard],
    children: [
      {
        path: "info",
        component: PersonalInfoComponent,
        canActivate: [authStudentGuard]
      },
      {
        path: "class-info",
        component: StudentClassInfoComponent,
        canActivate: [authStudentGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
