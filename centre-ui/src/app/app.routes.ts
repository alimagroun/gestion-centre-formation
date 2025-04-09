import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {authGuard} from "./services/guard/auth.guard";
import {authAdminGuard} from "./services/guard/auth-admin.guard";
import {AccessDeniedComponent} from "./pages/access-denied/access-denied.component";
import {authStudentGuard} from "./services/guard/auth-student.guard";
import {
  ChangePasswordFirstLoginComponent
} from "./pages/change-password-first-login/change-password-first-login.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    canActivate: [authGuard]
  },
  {
    path: 'first-login-change-password',
    component: ChangePasswordFirstLoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin'
    , loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authAdminGuard]
  },
  {
    path: 'student'
    , loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
    canActivate: [authStudentGuard]
  },
  {
    path: 'teacher'
    , loadChildren: () => import('./modules/teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [authAdminGuard]
  },
  {
    path: 'parent'
    , loadChildren: () => import('./modules/parent/parent.module').then(m => m.ParentModule),
    canActivate: [authAdminGuard]
  }
];
