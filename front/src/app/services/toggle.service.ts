import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private optionSelected: string = "none";

  getSelected(): string {
    return this.optionSelected;
  }

  setSelected(value: string): void {
    this.optionSelected = value;

  }

}
