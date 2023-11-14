import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-small',
  templateUrl: './button-small.component.html',
  styleUrls: ['./button-small.component.css']
})
export class ButtonSmallComponent {
  @Input() label: string = '';
}
