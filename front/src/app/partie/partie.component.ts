import {Component, Input, OnInit} from '@angular/core';
import {joueur} from "../models/joueur";
import { CardService } from "../services/card.services"
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { Card } from "../models/card.model"
import {Liaison} from "../models/liaison.model";
import {LiaisonService} from "../services/liaison.service";

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit{
  /*cards$: Observable<Card[]>;*/
  liaisons$: Observable<Liaison[]> ;





  constructor(private _route: ActivatedRoute, private liaisonService: LiaisonService, private router: Router) {
    //this.cards$ = cardService.findAll()
    this.liaisons$ = liaisonService.findAll()
  }

  liaison!: Liaison[]
  myCarte!: Card[];
  joueur1!: joueur;
  joueur2 !: joueur;
  joueur1Score!: number;
  joueur2Score!: number;
  ngOnInit(){
    this.joueur1Score=0;
    this.joueur2Score=0;
    this.joueur1 = new joueur('Dwight','https://screenrant.com/wp-content/uploads/2018/10/Dwight-Schrute-in-a-Meredith-Wig.jpg');
    this.joueur2 = new joueur('Mickeal','https://images4.fanpop.com/image/photos/17700000/Michael-the-office-17734797-400-600.jpg');

   /* this.cards$.subscribe(
      x => this.myCarte = x
    );*/

    this.liaisons$.subscribe(
      x => {
        this.liaison = x
        console.log(x)
      }
    );

    /*this.myCarte =[
      new Card(
      'chocolatine'
    ),
      new cardModel(
      'pain au chocolat'
    ),
    new cardModel(
      'le Z'
    )];*/
  }

}
