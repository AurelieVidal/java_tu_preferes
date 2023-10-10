import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
pseudoUser!: string;

//constructor(private router: Router){ }
  ngOnInit():void{}
  //onContinue(): void{
  //this.router.navigateByUrl('partie');
  //}

onSubmitForm():void {
  console.log(this.pseudoUser);
}
}
