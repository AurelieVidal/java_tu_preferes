import {Component, Input} from '@angular/core';
import {NumberService} from "../services/number.service"

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent {
  value = 2;
  @Input() label: string = '';

  constructor(private numberService: NumberService) {
  }

  //Quand on appuie sur -
  handleMinus() {
    if (this.label == "joueurs") {
      if (this.value > 2) {
        this.value--;
        this.numberService.setValueJoueur(this.value);
      }
    } else if (this.label == "manches") {
      if (this.value > 1) {
        this.value--;
        this.numberService.setValueManche(this.value);
      }
    }


  }

  //Quand on appuie sur +
  handlePlus() {
    if (this.label == "joueurs") {
      if (this.value < 10) {
        this.value++;
        this.numberService.setValueJoueur(this.value);
      }
    } else if (this.label == "manches") {
      this.value++;
      this.numberService.setValueManche(this.value);
    }
  }
}
