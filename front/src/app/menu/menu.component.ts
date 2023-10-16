import {Component, Input, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersoService} from "../services/perso.service";
import {Perso} from "../models/Perso";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{
  pseudoUser!: string;
  nbrJoueur!:number;
  listperso;
  persos!: Perso [];
  perso_choisi!: bigint;


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

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  SelectImage(id: any): void {
    this.perso_choisi = id;
    console.log(id);
  }

}
