import {Component, EventEmitter, Input, Output} from '@angular/core';
import {F} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-button-big',
  templateUrl: './button-big.component.html',
  styleUrls: ['./button-big.component.css']
})
export class ButtonBigComponent {
  @Input() label: string = '';

}
