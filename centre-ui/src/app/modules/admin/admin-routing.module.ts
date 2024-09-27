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
import {FormationComponent} from "./pages/specialty/formation/formation.component";
import {AddFormationComponent} from "./pages/specialty/formation/add-formation/add-formation.component";
import {RegistrationListComponent} from "./pages/register/registration-list/registration-list.component";
import {RegistrationDetailsComponent} from "./pages/register/registration-details/registration-details.component";
import {UserComponent} from "./pages/user/user.component";
import {SchoolYearComponent} from "./pages/school-year/school-year.component";
import {AddSchoolYearComponent} from "./pages/school-year/add-school-year/add-school-year.component";
import {DomainComponent} from "./pages/specialty/domain/domain.component";
import {AddDomainComponent} from "./pages/specialty/domain/add-domain/add-domain.component";
import {SpecialtyComponent} from "./pages/specialty/specialty/specialty.component";
import {AddClasseComponent} from "./pages/specialty/specialty/add-classe/add-classe.component";

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
        path:"user",
        component: UserComponent,
        canActivate: [authAdminGuard]
      },
      {
        path:"register",
        component: RegisterComponent,
        canActivate: [authAdminGuard]
      },
      {
        path: 'registrationList',
        component: RegistrationListComponent,
        canActivate: [authAdminGuard]
      },
      {
        path: 'school-year',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: SchoolYearComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addSchoolYear',
            component: AddSchoolYearComponent,
            canActivate: [authAdminGuard]
          },
        ],
      },
      {
        path: 'registrationDetails/:id',
        component: RegistrationDetailsComponent,
        canActivate: [authAdminGuard]
      },
      {
        path: 'registrationDocument',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: RegistrationDocumentComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addRegistrationDocument',
            component: AddRegistrationDocumentComponent,
            canActivate: [authAdminGuard]
          }
        ],
      },
      {
        path: 'formation',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: FormationComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addFormation',
            component: AddFormationComponent,
            canActivate: [authAdminGuard]
          },
        ],
      },
      {
        path: 'domain',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: DomainComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addDomain',
            component: AddDomainComponent,
            canActivate: [authAdminGuard]
          },
        ],
      },
      {
        path: 'classe',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: SpecialtyComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addClasse',
            component: AddClasseComponent,
            canActivate: [authAdminGuard]
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
