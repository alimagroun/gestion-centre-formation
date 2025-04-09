import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {PersonalInfoComponent} from "./pages/personal-info/personal-info.component";
import {authStudentGuard} from "../../services/guard/auth-student.guard";

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
