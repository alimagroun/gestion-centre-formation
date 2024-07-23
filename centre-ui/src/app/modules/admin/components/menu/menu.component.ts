import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Menu} from "./Menu";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public menuProperties: Array<Menu> = [
    {
      id: '1',
      titre: 'Gestion des utilisateurs',
      icon: 'bi bi-people',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: 'Role',
          icon: '',
          url: 'admin/role',
        },
      ],
    },
    {
      id: '2',
      titre: 'Gestion des matières',
      icon: 'bi bi-book',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Matières',
          icon: '',
          url: 'admin/subject',
        },
      ],
    },
  ];

  constructor(private router: Router) {}
  navigate(menu: Menu) {
    this.router.navigate([menu.url]);
  }
}
