import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private value: number = 50;
  private resetSubject: Subject<void> = new Subject<void>();


  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }

  resetSlider(): void {
    this.value = 50;
    this.resetSubject.next();
  }

}
