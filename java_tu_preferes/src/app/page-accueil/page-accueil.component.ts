import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent {
  nombreJoueur!: number;
  constructor(private router: Router){ }

  onContinue(): void{
    this.router.navigateByUrl('menu');
  }
  onSubmitForm():void {
    console.log(this.nombreJoueur);
  }
}
