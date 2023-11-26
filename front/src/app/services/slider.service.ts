import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private value: number = 50;


  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }


}
