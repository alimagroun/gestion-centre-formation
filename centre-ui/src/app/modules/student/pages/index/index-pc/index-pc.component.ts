import {Component} from '@angular/core';
import {HeaderComponent} from "../../../components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {MenuPcComponent} from "../../../components/menu/menu-pc/menu-pc.component";

@Component({
  selector: 'app-index-pc',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    MenuPcComponent
  ],
  templateUrl: './index-pc.component.html',
  styleUrl: './index-pc.component.scss'
})
export class IndexPcComponent {

}
