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
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent implements OnInit{
  liaison: Liaison[] = [];
  //theme_obs!: Observable<Theme>;
  theme!: Theme;
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  options: string[] = [];
  ids: number[] = []; //ids de toutes les cartes
  options_obs!: Observable<Card[]>;
  filteredOptions!: Observable<string[]>;
  carteControls1: { [key: number]: FormControl } = {};
  themenameFC = new FormControl('')
  carteControls2: { [key: number]: FormControl } = {};
  indexes1 :number[] = [];
  indexes2 :number[] = [];
  all_liaisons!: Liaison[];
  all_liaisons_obs!: Observable<Liaison[]>;
  all_themes!: Theme[];
  all_themes_obs!: Observable<Theme[]>;

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

    //this.theme_obs = this.themeService.findById(this.theme_id);
    this.options_obs = cardService.findAll();
    this.all_liaisons_obs = liaisonService.findAll();
    this.all_themes_obs = themeService.findAll();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl1.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );

    this.filteredOptions = this.myControl2.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );

    this.all_themes_obs.subscribe(
      theme => this.all_themes = theme
    )


    this.all_liaisons_obs.subscribe(x =>this.all_liaisons = x)



    this.options_obs.subscribe(
      cards => {
        this.options = cards.map(card => card.reponse)
        this.ids = cards.map(card => Number(card.id))
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


  focusinputs(formcontroller: FormControl) {
    this.filteredOptions = formcontroller.valueChanges.pipe(

      map(value => this._filter(value || '')),
    );


  }



  async valider() {
    const nom = this.themenameFC.value;
    console.log(nom)
    if (nom == null || nom.trim() === '') {
      // Afficher un message d'erreur ou prendre toute autre action nécessaire
      this.showErrorMessage("Le nom du thème est vide.");
      return; // Arrêter la validation si le nom est vide ou null
    }


    for (let theme of this.all_themes){
      if (theme.name == nom){
        this.showErrorMessage("Il existe déjà un thème avec ce nom");
        return;
      }
    }

    if (this.liaison.length === 0) {
      this.showErrorMessage("Vous n'avez pas ajouté de dilemme ! ");
      return;
    }



    const liaisons: Liaison[] = [];

    for (let index = 0; index < this.indexes1.length; index++) {
      const value1 = this.carteControls1[this.indexes1[index]].value;
      const value2 = this.carteControls2[this.indexes2[index]].value;

      // Vérifier si les valeurs sont vides
      if (!value1.trim() || !value2.trim()) {
        this.showErrorMessage("Certains champs sont incomplets, merci de les remplir");
        return; // Arrêter la validation si les champs sont vides
      }

      const id1 = await this.createOrFindCard(value1);
      const id2 = await this.createOrFindCard(value2);
      console.log("IDDDD1")
      console.log(id1)
      const liaison = { id: this.liaison[index].id, id_1: id1, id_2: id2 };

      if (id1==id2){
        this.showErrorMessage("Une des liaisons a deux choix identiques ! ")
        return;
      }

      if (this.liaison[index].id_1 !== id1 || this.liaison[index].id_2 !== id2) {
        const existingLiaison = this.findExistingLiaison(id1, id2);
        console.log("LIAISON A AJOUTER")
        console.log(liaison)
        if (existingLiaison) {
          liaisons.push(existingLiaison);
        } else {
          console.log("LA LIAISON NEXISTE PAS")
          const newLiaison = await this.createLiaison(id1, id2);
          liaisons.push(newLiaison);
        }
      } else {
        liaisons.push(liaison);
      }
    }

    const theme = { name: String(nom), paires: liaisons };
    console.log("Thème modifié:", theme);

    this.themeService.create(theme).subscribe(() => {
      //this.router.navigate(["students"])
    })

    console.log("ajout du thème")
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
    console.log("dans existe")
    for (let index = 0; index < this.options.length; index++) {
      if (this.options[index]==value){
        id=this.ids[index]
        console.log(this.ids)
      }
    }
    return id
  }

  async createOrFindCard(value: string): Promise<number> {
    const id = this.existe(value);
    if (id === -1) {
      console.log("JAMAIS")
      const newCard = await this.createCard(value);
      this.options.push(newCard.reponse)
      this.ids.push(Number(newCard.id));
      return Number(newCard.id);
    }
    return id;
  }

  async AddLiaison() {
    // Vérifiez si les cartes sont vides
    if (!this.myControl1.value!!.trim() || !this.myControl2.value!!.trim()) {
      this.showErrorMessage("Vous n'avez pas rempli tous les champs, impossible d'ajouter le dilemme");
      return;
    }

    if (this.myControl1.value == this.myControl2.value) {
      this.showErrorMessage("Vous avez renseigné deux choix identiques !");
      return;
    }

    for (let ind of this.indexes1){
      if (this.myControl1.value == this.carteControls1[ind].value && this.myControl2.value == this.carteControls2[ind].value){
        console.log("LIAISON EXISTANTE")
        this.showErrorMessage('Liaison existante !');
        return;
      }

    }

    // Vérifiez si les cartes existent et créez-les si nécessaire
    const id1 = await this.createOrFindCard(this.myControl1.value!!);
    const id2 = await this.createOrFindCard(this.myControl2.value!!);

    // Vérifiez si la liaison existe
    const existingLiaison = this.findExistingLiaison(id1, id2);

    if (existingLiaison) {
      this.liaison.push(existingLiaison)
      this.indexes1.push(Number(existingLiaison.id))
      this.carteControls1[Number(existingLiaison.id)] = new FormControl(this.myControl1.value!!);
      this.indexes2.push(Number(existingLiaison.id))
      this.carteControls2[Number(existingLiaison.id)] = new FormControl(this.myControl2.value!!);

    } else {
      // Créez une nouvelle liaison
      const newLiaison = await this.createLiaison(id1, id2);
      // Ajoutez la nouvelle liaison à la liste
      this.liaison.push(newLiaison);
      this.indexes1.push(Number(newLiaison.id))
      this.carteControls1[Number(newLiaison.id)] = new FormControl(this.myControl1.value!!);
      this.indexes2.push(Number(newLiaison.id))
      this.carteControls2[Number(newLiaison.id)] = new FormControl(this.myControl2.value!!);
      this.all_liaisons.push(newLiaison)
    }

    console.log(this.liaison)



    this.myControl1.setValue('');
    this.myControl2.setValue('');

  }

  deleteLiaison(liaison: Liaison) {
    console.log(liaison)
    const index = this.liaison.indexOf(liaison); // Trouver l'index de la liaison à supprimer
    this.indexes1.splice(index, 1);
    this.indexes2.splice(index,1);
    this.liaison.splice(index, 1); // Supprimer la liaison en utilisant splice

  }






  protected readonly Number = Number;



}

