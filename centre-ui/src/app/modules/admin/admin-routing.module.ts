import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {authGuard} from "../../services/guard/auth.guard";
import {authAdminGuard} from "../../services/guard/auth-admin.guard";

const routes: Routes = [
  {
    path:"",
    component: IndexComponent,
    canActivate: [authAdminGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
