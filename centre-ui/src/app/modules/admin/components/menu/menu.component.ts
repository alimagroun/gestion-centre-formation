import {Component} from '@angular/core';
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
          titre: 'Liste des utilisateurs',
          icon: '',
          url: 'admin/user',
        },
        {
          id: '12',
          titre: 'Liste des rôles',
          icon: '',
          url: 'admin/role',
        },
      ],
    },
    {
      id: '3',
      titre: 'Gestion des formations',
      icon: 'bi bi-book',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Liste type des formations',
          icon: '',
          url: 'admin/formation',
        },
        {
          id: '32',
          titre: 'Liste des domaines',
          icon: '',
          url: 'admin/domain',
        },
        {
          id: '33',
          titre: 'Liste des spécialités',
          icon: '',
          url: 'admin/specialty',
        }
      ],
    },
    {
      id: '5',
      titre: 'Gestion des classes',
      icon: 'bi bi-journal-text',
      url: '',
      sousMenu: [
        {
          id: '51',
          titre: 'Liste des classes de formation professionnelle',
          icon: '',
          url: 'admin/accreditedClass',
        },
        {
          id: '52',
          titre: 'Liste des classes de formation accélérée',
          icon: '',
          url: 'admin/acceleratedClass',
        }
      ],
    },
    {
      id: '2',
      titre: "Gestion des inscriptions",
      icon: 'bi bi-pencil-square',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Nouvelle inscription',
          icon: '',
          url: 'admin/register',
        },
        {
          id: '22',
          titre: "Liste des documents d'inscription",
          icon: '',
          url: 'admin/registrationDocument',
        },
        {
          id: '23',
          titre: "Liste des inscriptions",
          icon: '',
          url: 'admin/registrationList',
        },
      ],
    },
    {
      id: '4',
      titre: "Gestion des années scolaires",
      icon: 'bi bi-calendar3',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'liste des années scolaires ',
          icon: '',
          url: 'admin/school-year',
        },
      ],
    },
    {
      id: '6',
      titre: "Gestion des personne",
      icon: 'bi bi-person-bounding-box',
      url: '',
      sousMenu: [
        {
          id: '61',
          titre: 'Liste des étudiants',
          icon: '',
          url: 'admin/students',
        },
        {
          id: '62',
          titre: 'Liste des parents',
          icon: '',
          url: 'admin/parents',
        },
        {
          "id": "63",
          "titre": "Liste des enseignants",
          "icon": "",
          "url": "admin/teachers"
        }
      ],
    },
    {
      id: '7',
      "titre": "Gestion des salles de classe",
      "icon": "bi bi-door-closed",
      url: '',
      sousMenu: [
        {
          id: '71',
          "titre": "Liste des salles",
          icon: '',
          "url": "admin/classrooms"
        },
      ],
    }

  ];

  constructor(private router: Router) {
  }

  navigate(menu: Menu) {
    this.router.navigate([menu.url]);
  }
}
