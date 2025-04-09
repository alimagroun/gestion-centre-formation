import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Menu} from "../../../services/menu/Menu";
import {MenuService} from "../../../services/menu/menu.service";

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent implements OnInit {

  menuProperties: Menu[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuProperties = this.menuService.getMenus()
  }


  navigate(menu: Menu) {
    this.menuService.navigate(menu)
  }
}
