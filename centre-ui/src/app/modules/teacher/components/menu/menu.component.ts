import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {Menu} from "./Menu";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  public menuProperties: Array<Menu> = [
    {
      id: '1',
      titre: 'Mes informations',
      icon: 'bi bi-person-circle',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: 'Informations personnelles',
          icon: 'bi bi-person-lines-fill',
          url: 'student/info',
        },
      ],
    },
  ];

  constructor(private router: Router) {
  }

  navigate(menu: Menu) {
    this.router.navigate([menu.url]);
  }
}
