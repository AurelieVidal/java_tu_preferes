import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  nombreManche!: number;
  constructor(private router: Router){ }

  onContinue(): void{
    this.router.navigateByUrl('menu/'+this.nombreManche);
  }
  onSubmitForm():void {
    console.log(this.nombreManche);
  }

}
