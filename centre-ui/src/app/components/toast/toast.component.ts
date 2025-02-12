import {Component} from '@angular/core';
import {ToastService} from "../../services/toast/toast.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  showToast = false;
  toastMessage = '';
  isError = false;

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast) => {
      this.toastMessage = toast.message;
      this.isError = toast.isError;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    });
  }

  hideToast() {
    this.showToast = false;
  }

}
