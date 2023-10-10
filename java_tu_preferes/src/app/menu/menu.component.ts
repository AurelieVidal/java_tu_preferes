import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
pseudoUser!: string;

onSubmitForm():void {
  console.log(this.pseudoUser);
}
}
