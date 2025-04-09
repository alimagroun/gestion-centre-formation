import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../../components/header/header.component";
import {MenuMobileComponent} from "../../../components/menu/menu-mobile/menu-mobile.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-index-mobile',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuMobileComponent,
    NgIf
  ],
  templateUrl: './index-mobile.component.html',
  styleUrl: './index-mobile.component.scss'
})
export class AppComponent {
  isStudentPage = false;

  constructor(private router: Router) {
  }

  get isIndexRoute(): boolean {
    return this.router.url === '/student';
  }
}
