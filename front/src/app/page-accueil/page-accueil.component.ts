import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent {
  nombreJoueur!: number;
  nombreManche=1;
  constructor(private router: Router, private activatedRoute: ActivatedRoute){ }

  onContinue(): void{
    this.router.navigateByUrl('menu/'+this.nombreJoueur+'/'+this.nombreManche);
  }
  onSubmitForm():void {
    console.log(this.nombreJoueur);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
        this.nombreManche = s["nombreManche"] || this.nombreManche;
        console.log("le nbr de manche est"+this.nombreManche);
    })
  }

}
