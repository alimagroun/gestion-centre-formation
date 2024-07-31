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
      titre: 'Gestion des Utilisateurs',
      icon: 'bi bi-people',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: 'Utilisateur',
          icon: '',
          url: 'admin/role',
        },
        {
          id: '12',
          titre: 'Role',
          icon: '',
          url: 'admin/role',
        },
      ],
    },
    {
      id: '2',
      titre: "Gestion des Inscriptions",
      icon: 'bi bi-key',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Inscription',
          icon: '',
          url: 'admin/register',
        },
        {
          id: '22',
          titre: "Document d'inscription",
          icon: '',
          url: 'admin/registrationDocument',
        },
      ],
    }
  ];

  constructor(private router: Router) {}
  navigate(menu: Menu) {
    this.router.navigate([menu.url]);
  }
}
