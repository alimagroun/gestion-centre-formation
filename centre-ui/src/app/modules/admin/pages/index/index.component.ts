import {Component, OnInit} from '@angular/core';
import {RoleResponse} from "../../../../services/models/role-response";
import {RoleControllerService} from "../../../../services/services/role-controller.service";
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../components/menu/menu.component";
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    HeaderComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
