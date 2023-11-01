import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Liaison } from "../models/liaison.model";
import { map, Observable, startWith } from "rxjs";
import { Theme } from "../models/themes.model";
import { CardService } from "../services/card.services";
import { ActivatedRoute, Router } from "@angular/router";
import { ThemeService } from "../services/theme.service";
import { FormControl } from "@angular/forms";
import { Card } from "../models/card.model";
import {LiaisonService} from "../services/liaison.service";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  all_liaisons!: Liaison[];
  all_liaisons_obs!: Observable<Liaison[]>;

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private liaisonService: LiaisonService,
    private snackBar: MatSnackBar
  ) {
    this.theme_id = parseInt(this.activatedRoute.snapshot.params["id"]);
    this.theme_obs = this.themeService.findById(this.theme_id);
    this.options_obs = cardService.findAll();
    this.all_liaisons_obs = liaisonService.findAll();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );

    this.all_liaisons_obs.subscribe(x =>this.all_liaisons = x)



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
              this.indexes1.push(Number(paire.id))
              this.carteControls1[Number(paire.id)] = new FormControl(carte1.reponse);
              console.log("création form : "+ paire.id_1 + "---"+this.carteControls1[Number(paire.id)].value)
              console.log(this.carteControls1[Number(paire.id)])
            }
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => {
              paire.carte2 = carte2;
              this.indexes2.push(Number(paire.id))
              this.carteControls2[Number(paire.id)] = new FormControl(carte2.reponse);
              console.log("création form 2 : "+ paire.id_2 +"---"+this.carteControls2[Number(paire.id)].value);

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

    //vérification





    this.filteredOptions = formcontrolller.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );

    console.log(this.indexes1)
    console.log(this.carteControls1)
    console.log(formcontrolller)


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

  handleInputChange(type: string, index: number, formcontrolller: FormControl) {

    console.log('Champ de recherche modifié:', formcontrolller.value);
    for (let ind of this.indexes1){
      if (ind != this.indexes1[index]){
        if (this.carteControls1[this.indexes1[index]].value == this.carteControls1[ind].value && this.carteControls2[this.indexes2[index]].value == this.carteControls2[ind].value){
          console.log("LIAISON EXISTANTE")
          formcontrolller.setValue("");
          this.showErrorMessage('Liaison existante !');
        }

      }

    }
  }


  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000, // Durée d'affichage du toast en millisecondes
    });
  }


  focusinputs() {
    this.filteredOptions = this.myControl.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );
  }

  async valider() {

    const nom = this.themenameFC.value;
    const liaisons: Liaison[] = [];

    for (let index = 0; index < this.indexes1.length; index++) {
      const value1 = this.carteControls1[this.indexes1[index]].value;
      const id1 = await this.createOrFindCard(value1);

      const value2 = this.carteControls2[this.indexes2[index]].value;
      const id2 = await this.createOrFindCard(value2);

      const liaison = { id: this.liaison[index].id, id_1: id1, id_2: id2 };

      if (
        this.liaison[index].id_1 !== id1 ||
        this.liaison[index].id_2 !== id2
      ) {
        const existingLiaison = this.findExistingLiaison(id1, id2);

        if (existingLiaison) {
          liaisons.push(existingLiaison);
        } else {
          const newLiaison = await this.createLiaison(id1, id2);
          liaisons.push(newLiaison);
        }
      } else {
        liaisons.push(liaison);
      }
    }

    const theme = { name: String(nom), paires: liaisons };
    console.log("Thème modifié:", theme);

    this.themeService.update(this.theme_id, theme).subscribe(() => {
      this.router.navigate(["themes"])
    })

    // Faire le PUT ou toute autre opération nécessaire ici

    this.router.navigateByUrl("themes");

  }



  async createCard(value: string): Promise<Card> {
    return new Promise((resolve, reject) => {
      const card: Card = { reponse: value };
      this.cardService.create(card).subscribe(
        (newCard: Card) => {
          console.log("Nouvelle carte créée avec ID " + newCard.id);
          resolve(newCard);
        },
        (error) => {
          console.error("Erreur lors de la création de la carte:", error);
          reject(error);
        }
      );
    });
  }

  findExistingLiaison(id1: number, id2: number): Liaison | undefined {
    return this.all_liaisons.find(
      (liaison) => liaison.id_1 === id1 && liaison.id_2 === id2
    );
  }

  async createLiaison(id1: number, id2: number): Promise<Liaison> {
    const newLiaison: Liaison = { id_1: id1, id_2: id2 };
    return new Promise((resolve, reject) => {
      this.liaisonService.create(newLiaison).subscribe(
        (newLiaison: Liaison) => {
          console.log("Nouvelle liaison créée avec ID " + newLiaison.id);
          resolve(newLiaison);
        },
        (error) => {
          console.error("Erreur lors de la création de la liaison:", error);
          reject(error);
        }
      );
    });
  }

  existe(value: string):number{
    let id: number = -1
    for (let index = 0; index < this.options.length; index++) {
      if (this.options[index]==value){
        id=this.ids[index]
      }
    }
    return id
  }

  async createOrFindCard(value: string): Promise<number> {
    const id = this.existe(value);
    if (id === -1) {
      const newCard = await this.createCard(value);
      return Number(newCard.id);
    }
    return id;
  }






  protected readonly Number = Number;


}
