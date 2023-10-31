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
  myControl = new FormControl('');
  options: string[] = [];
  ids: number[] = [];
  options_obs!: Observable<Card[]>;
  filteredOptions!: Observable<string[]>;
  carteControls1: { [key: number]: FormControl } = {};
  themenameFC!: FormControl<string | null>
  carteControls2: { [key: number]: FormControl } = {};
  indexes1 :number[] = [];
  indexes2 :number[] = [];

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();
    console.log(this.options.filter(option => option.toLowerCase().includes(filterValue)))
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
      cards => {
        this.options = cards.map(card => card.reponse)
        this.ids = cards.map(card => Number(card.id))
      }
    );

    this.theme_obs.subscribe(
      x => {
        this.theme = x;
        console.log(this.theme);
        this.liaison = this.theme.paires;
        this.themenameFC = new FormControl(this.theme.name)
        console.log("LE TRUC DU NOM : " + this.themenameFC.value)
        for (const paire of this.liaison) {
          this.cardService.findById(Number(paire.id_1)).subscribe(
            carte1 => {
              paire.carte1 = carte1;
              this.indexes1.push(paire.id_1)
              this.carteControls1[paire.id_1] = new FormControl(carte1.reponse);
              console.log("création form : "+ paire.id_1 + "---"+this.carteControls1[paire.id_1].value)
              console.log(this.carteControls1[paire.id_1])
            }
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => {
              paire.carte2 = carte2;
              this.indexes2.push(paire.id_2)
              this.carteControls2[paire.id_2] = new FormControl(carte2.reponse);
              console.log("création form 2 : "+ paire.id_2 +"---"+this.carteControls2[paire.id_2].value);

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


  handleInputFocus(type: string, index: number, formcontrolller: FormControl): void {

    this.filteredOptions = formcontrolller.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );




    console.log("id = "+index)
    console.log ("str : " + type)
    if (type =='inputCarte1') {
      console.log("valeur = " + this.carteControls1[this.indexes1[index]].value);
      this._filter(this.carteControls1[this.indexes1[index]].value)
    }
    if (type =='inputCarte2') {

      console.log("valeur = " + this.carteControls2[this.indexes2[index]].value);
      this._filter(this.carteControls2[this.indexes2[index]].value)
    }




  }

  focusinputs() {
    this.filteredOptions = this.myControl.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );
  }

  valider() {
    let nom = this.themenameFC.value


    let liaisons: Liaison[] = []
    console.log(nom)
    for (let index = 0; index < this.indexes1.length; index++) {
      let value1 = this.carteControls1[this.indexes1[index]].value
      let id_1 = this.existe(value1)

      if (id_1 == -1){
        //post la carte et recup le  nouvel id
      }

      let value2 = this.carteControls2[this.indexes2[index]].value
      let id_2 = this.existe(value2)

      if (id_2 == -1){
        //post la carte et recup le  nouvel id
      }

      const liaison : Liaison = {id_1: id_1, id_2: id_2}
      liaisons.push(liaison)

      console.log(value1+"----"+value2)
    }
    console.log(liaisons)

    let theme : Theme = {name: String(nom), paires: liaisons}
    console.log(theme)
    /*
    this.cardService.create(card).subscribe(() => {
      this.router.navigate(["cards"])
    })*/
    //faire le PUT
  }

  existe(value: string):number{
    let id: number = -1
    for (let index = 0; index < this.options.length; index++) {
      if (this.options[index]==value){
        id=this.ids[index]
      }
    }

    console.log("L'INDICE DOIT ETRE DIFFERENT DE -1 A CHAQUE FOIS : "+id)


    //vérifier si une variable appartient à la liste des cartes (dans le front direct je pense)
    //retourne l'id de la carte si elle existe, sinon -1
    return id
  }


}
