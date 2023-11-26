import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-big',
  templateUrl: './button-big.component.html',
  styleUrls: ['./button-big.component.css']
})
export class ButtonBigComponent {
  @Input() label: string = '';

}
