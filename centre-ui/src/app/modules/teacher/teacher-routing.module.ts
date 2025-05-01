import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "../teacher/pages/index/index.component";
import {PersonalInfoComponent} from "../student/pages/personal-info/personal-info.component";
import {authTeacherGuard} from "../../services/guard/auth-teacher.guard";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    canActivate: [authTeacherGuard],
    children: [
      {
        path: "info",
        component: PersonalInfoComponent,
        canActivate: [authTeacherGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
