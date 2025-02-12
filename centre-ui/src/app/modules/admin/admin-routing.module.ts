import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
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
import {AddSpecialtyComponent} from "./pages/specialty/specialty/add-specialty/add-specialty.component";
import {AccreditedClassComponent} from "./pages/classmanagement/accredited-class/accredited-class.component";
import {AddClassComponent} from "./pages/classmanagement/accredited-class/add-class/add-class.component";
import {AcceleratedClassComponent} from "./pages/classmanagement/accelerated-class/accelerated-class.component";
import {
  AddClassAcceleratedComponent
} from "./pages/classmanagement/accelerated-class/add-class-accelerated/add-class-accelerated.component";
import {StudentsListComponent} from "./pages/student-parent-management/students-list/students-list.component";
import {ParentsListComponent} from "./pages/student-parent-management/parents-list/parents-list.component";
import {
  ParentDetailComponent
} from "./pages/student-parent-management/parents-list/parent-detail/parent-detail.component";
import {
  StudentDetailComponent
} from "./pages/student-parent-management/students-list/student-detail/student-detail.component";
import {
  AcceleratedStudentsListComponent
} from "./pages/classmanagement/accelerated-class/accelerated-students-list/accelerated-students-list.component";
import {
  AccreditedStudentsListComponent
} from "./pages/classmanagement/accredited-class/accredited-students-list/accredited-students-list.component";
import {ClassRoomComponent} from "./pages/class-room/class-room.component";
import {AddClassRoomComponent} from "./pages/class-room/add-class-room/add-class-room.component";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    canActivate: [authAdminGuard],
    children: [
      {
        path: "role",
        component: RoleComponent,
        canActivate: [authAdminGuard]
      },
      {
        path: "user",
        component: UserComponent,
        canActivate: [authAdminGuard]
      },
      {
        path: "register",
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
        path: 'specialty',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: SpecialtyComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addSpecialty',
            component: AddSpecialtyComponent,
            canActivate: [authAdminGuard]
          }
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
        path: 'accreditedClass',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: AccreditedClassComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addClassAccredited',
            component: AddClassComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'AccreditedStudentsList/:id',
            component: AccreditedStudentsListComponent,
            canActivate: [authAdminGuard]
          }
        ],
      },
      {
        path: 'acceleratedClass',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: AcceleratedClassComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addClassAccelerated',
            component: AddClassAcceleratedComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'studentsList/:id',
            component: AcceleratedStudentsListComponent,
            canActivate: [authAdminGuard]
          }
        ],
      },
      {
        path: 'students',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: StudentsListComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'student-details/:id',
            component: StudentDetailComponent,
            canActivate: [authAdminGuard]
          },
        ],
      },
      {
        path: 'parents',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: ParentsListComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'parent-details/:id',
            component: ParentDetailComponent,
            canActivate: [authAdminGuard]
          },
        ],
      },
      {
        path: 'classrooms',
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            component: ClassRoomComponent,
            canActivate: [authAdminGuard]
          },
          {
            path: 'addClassRoom',
            component: AddClassRoomComponent,
            canActivate: [authAdminGuard]
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
