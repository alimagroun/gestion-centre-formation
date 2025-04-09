import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Menu} from "../../../services/menu/Menu";
import {MenuService} from "../../../services/menu/menu.service";

@Component({
  selector: 'app-menu-pc',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './menu-pc.component.html',
  styleUrl: './menu-pc.component.scss'
})
export class MenuPcComponent implements OnInit {

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
