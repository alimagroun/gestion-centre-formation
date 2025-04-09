import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Menu} from "./Menu";


@Injectable({
  providedIn: 'root'
})

export class MenuService {

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
        {
          id: '12',
          titre: 'Mon groupe',
          icon: 'bi bi-people-fill',
          url: 'user/group',
        },
        {
          id: '13',
          titre: 'Mes inscriptions',
          icon: 'bi bi-journal-check',
          url: 'user/inscriptions',
        },
      ],
    },
  ];

  constructor(private router: Router) {
  }

  getMenus(): Menu[] {
    return this.menuProperties;
  }

  navigate(menu: Menu) {
    this.router.navigate([menu.url]);
  }
}
