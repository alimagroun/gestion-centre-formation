import {Component, HostListener, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {IndexPcComponent} from "./index-pc/index-pc.component";
import {AppComponent} from "./index-mobile/index-mobile.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NgIf,
    IndexPcComponent,
    AppComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  isMobile: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 900
  }
}
