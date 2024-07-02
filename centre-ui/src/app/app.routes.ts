import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {authGuard} from "./services/guard/auth.guard";
import {authAdminGuard} from "./services/guard/auth-admin.guard";
import {AccessDeniedComponent} from "./pages/access-denied/access-denied.component";

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
    path: 'admin'
    , loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authAdminGuard]
  }
];
