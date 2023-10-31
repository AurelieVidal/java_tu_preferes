import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Liaison } from "../models/liaison.model";
import { map, Observable, startWith } from "rxjs";
import { Theme } from "../models/themes.model";
import { CardService } from "../services/card.services";
import { ActivatedRoute, Router } from "@angular/router";
import { ThemeService } from "../services/theme.service";
import { FormControl } from "@angular/forms";
import { Card } from "../models/card.model";

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.css']
})
export class EditThemeComponent implements OnInit{
  liaison!: Liaison[];
  theme_obs!: Observable<Theme>;
  theme!: Theme;
  theme_id!: number;
  myControl = new FormControl("test");
  options: string[] = [];
  options_obs!: Observable<Card[]>;
  filteredOptions!: Observable<string[]>;
  carteControls1: { [key: number]: FormControl } = {};

  carteControls2: { [key: number]: FormControl } = {};
  indexes1 :number[] = [];
  indexes2 :number[] = [];

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService
  ) {
    this.theme_id = parseInt(this.activatedRoute.snapshot.params["id"]);
    this.theme_obs = this.themeService.findById(this.theme_id);
    this.options_obs = cardService.findAll();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );



    this.options_obs.subscribe(
      cards => this.options = cards.map(card => card.reponse)
    );

    this.theme_obs.subscribe(
      x => {
        this.theme = x;
        console.log(this.theme);
        this.liaison = this.theme.paires;
        for (const paire of this.liaison) {
          this.cardService.findById(Number(paire.id_1)).subscribe(
            carte1 => {
              paire.carte1 = carte1;
              this.indexes1.push(paire.id_1)
              this.carteControls1[paire.id_1] = new FormControl(carte1.reponse);
              console.log("création form : "+ paire.id_1 + "---"+this.carteControls1[paire.id_1].value)
            }
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => {
              paire.carte2 = carte2;
              this.indexes2.push(paire.id_2)
              this.carteControls2[paire.id_2] = new FormControl(carte2.reponse);
              console.log("création form 2 : "+ paire.id_2 +"---"+this.carteControls2[paire.id_2].value);

              //trouver un moyen d'ajouter le index++ sans que ça ne dérange tout
            }

          );

        }
      }
    );
  }



  versAddCard(): void {
    this.router.navigateByUrl('addCard');
  }

  versAddLiaison(): void {
    this.router.navigateByUrl('addLiaison');
  }



  displayValue(value: string | null): void {
    console.log("Valeur de l'input : ", value);
  }


  handleInputFocus(type: string, index: number): void {



    console.log("id = "+index)
    console.log ("str : " + type)
    if (type =='inputCarte1') {
      console.log("valeur = " + this.carteControls1[this.indexes1[index]].value);
    }
    if (type =='inputCarte2') {

      console.log("valeur = " + this.carteControls2[this.indexes2[index]].value);
    }

  }

}
