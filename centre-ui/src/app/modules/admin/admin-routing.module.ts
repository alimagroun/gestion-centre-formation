import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {authGuard} from "../../services/guard/auth.guard";
import {authAdminGuard} from "../../services/guard/auth-admin.guard";
import {RoleComponent} from "./pages/role/role.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RegistrationDocumentComponent} from "./pages/registration-document/registration-document.component";
import {
  AddRegistrationDocumentComponent
} from "./pages/registration-document/add-registration-document/add-registration-document.component";

const routes: Routes = [
  {
    path:"",
    component: IndexComponent,
    canActivate: [authAdminGuard],
    children: [
      {
        path:"role",
        component: RoleComponent,
        canActivate: [authAdminGuard]
      },
      {
        path:"register",
        component: RegisterComponent,
        canActivate: [authAdminGuard]
      },
      {
        path: 'registrationDocument',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: RegistrationDocumentComponent,
          },
          {
            path: 'addRegistrationDocument',
            component: AddRegistrationDocumentComponent,
          },
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
