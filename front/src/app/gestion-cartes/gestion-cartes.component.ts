import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Liaison } from '../models/liaison.model';
import { LiaisonService } from '../services/liaison.service';
import { CardService } from "../services/card.services";
import {Router} from "@angular/router";
import { Card } from '../models/card.model';

@Component({
  selector: 'app-gestion-cartes',
  templateUrl: './gestion-cartes.component.html',
  styleUrls: ['./gestion-cartes.component.css']
})
export class GestionCartesComponent implements OnInit {
  liaisons$: Observable<Liaison[]>;
  liaison!: Liaison[];

  constructor(
    private liaisonService: LiaisonService,
    private cardService: CardService,
    private router: Router
  ) {
    this.liaisons$ = liaisonService.findAll();
  }

  ngOnInit() {
    this.liaisons$.subscribe(
      x => {
        this.liaison = x;
        console.log('Liaisons récupérées :', x);

        // Récupérer les réponses des cartes pour chaque liaison
        for (const paire of this.liaison) {
          this.cardService.findById(Number(paire.id_1)).subscribe(
            carte1 => paire.carte1 = carte1
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => paire.carte2 = carte2
          );
        }
      }
    );
  }

  versAddCard(): void{
    this.router.navigateByUrl('addCard');
  }





}
