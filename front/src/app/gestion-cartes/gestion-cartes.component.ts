import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Liaison } from '../models/liaison.model';
import { CardService } from "../services/card.services";
import {ActivatedRoute, Router} from "@angular/router";
import {ThemeModel} from "../models/themes.model";
import {ThemeService} from "../services/theme.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-gestion-cartes',
  templateUrl: './gestion-cartes.component.html',
  styleUrls: ['./gestion-cartes.component.css']
})
export class GestionCartesComponent implements OnInit {
  liaison!: Liaison[];
  theme_obs!: Observable<ThemeModel>
  theme!: ThemeModel
  theme_id!:number

  constructor(
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService
  ) {
    this.theme_id = parseInt(this.activatedRoute.snapshot.params["id"]);
    this.theme_obs = this.themeService.findById(this.theme_id);
  }

  ngOnInit() {
    this.theme_obs.subscribe (
      x=> {
        this.theme = x;

        this.liaison = this.theme.paires

        for (const paire of this.liaison) {
          this.cardService.findById(Number(paire.id_1)).subscribe(
            carte1 => paire.carte1 = carte1
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => paire.carte2 = carte2
          );}})
  }

  versEditTheme(): void{
    this.router.navigateByUrl('edit/'+this.theme_id);
  }
  versAddCard(): void{
    this.router.navigateByUrl('addCard');
  }

  versAddLiaison(): void{
    this.router.navigateByUrl('addLiaison');
  }
}
