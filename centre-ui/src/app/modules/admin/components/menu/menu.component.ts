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
          url: 'admin/user',
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
      id: '3',
      titre: 'Gestion des classe',
      icon: 'bi bi-book-half',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Formation',
          icon: '',
          url: 'admin/formation',
        },
        {
          id: '32',
          titre: 'Domain',
          icon: '',
          url: 'admin/domain',
        },
        {
          id: '33',
          titre: 'Spécialité',
          icon: '',
          url: 'admin/specialty',
        },
        {
          id: '34',
          titre: 'Classes formation professionnelle',
          icon: '',
          url: 'admin/accreditedClass',
        },
        {
          id: '35',
          titre: 'Classes de formation accélérée',
          icon: '',
          url: 'admin/acceleratedClass',

        }
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
        {
          id: '23',
          titre: "Liste d'inscription",
          icon: '',
          url: 'admin/registrationList',
        },
      ],
    },
    {
      id: '4',
      titre: "Gestion des années scolaires",
      icon: 'bi bi-key',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'liste des années scolaires ',
          icon: '',
          url: 'admin/school-year',
        },
      ],
    }
  ];

  constructor(private router: Router) {}
  navigate(menu: Menu) {
    this.router.navigate([menu.url]);
  }
}
