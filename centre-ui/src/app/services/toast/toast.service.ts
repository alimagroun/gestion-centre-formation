import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<{ message: string; isError: boolean }>();
  public toastState = this.toastSubject.asObservable();

  showSuccess(message: string) {
    this.toastSubject.next({ message, isError: false });
  }

  showError(message: string) {
    this.toastSubject.next({ message, isError: true });
  }
}
