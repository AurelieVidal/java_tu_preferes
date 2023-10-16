import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersoService} from "../services/perso.service";
import {Perso} from "../models/Perso";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  pseudoUser!: string;
  nbrJoueur!:number;
  listperso;
  persos!: Perso [];


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private persoService: PersoService){
    this.listperso =persoService.findAll();
  }




  ngOnInit():void{
    this.activatedRoute.params.subscribe(s=>{
        this.nbrJoueur = s["nbrJoueur"]
      }
    )

    this.listperso.subscribe(
      x => {
        this.persos = x;
        console.log(x)
      }
    );
  }
  onContinue(): void{
    this.router.navigateByUrl('questions');
  }

  onSubmitForm():void {
    console.log(this.pseudoUser);
    console.log("c'est réussi"+this.nbrJoueur);
  }

}
