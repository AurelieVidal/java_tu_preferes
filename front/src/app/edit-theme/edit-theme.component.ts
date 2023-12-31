import {Component, OnInit} from '@angular/core';
import {Liaison} from "../models/liaison.model";
import {map, Observable} from "rxjs";
import {ThemeModel} from "../models/themes.model";
import {CardService} from "../services/card.services";
import {ActivatedRoute, Router} from "@angular/router";
import {ThemeService} from "../services/theme.service";
import {FormControl} from "@angular/forms";
import {Card} from "../models/card.model";
import {LiaisonService} from "../services/liaison.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.css']
})
export class EditThemeComponent implements OnInit {
  // Déclaration des propriétés
  liaison!: Liaison[];
  theme_obs!: Observable<ThemeModel>;
  theme!: ThemeModel;
  theme_id!: number;
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  options: string[] = [];
  ids: number[] = [];
  options_obs!: Observable<Card[]>;
  filteredOptions!: Observable<string[]>;
  carteControls1: { [key: number]: FormControl } = {};
  themenameFC!: FormControl<string | null>
  carteControls2: { [key: number]: FormControl } = {};
  indexes1: number[] = [];
  indexes2: number[] = [];
  all_liaisons!: Liaison[];
  all_liaisons_obs!: Observable<Liaison[]>;
  protected readonly Number = Number;

  constructor(
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private liaisonService: LiaisonService,
    private snackBar: MatSnackBar
  ) {
    // Initialisation des propriétés et récupération de l'ID du thème

    this.theme_id = parseInt(this.activatedRoute.snapshot.params["id"]);
    this.theme_obs = this.themeService.findById(this.theme_id);
    this.options_obs = cardService.findAll();
    this.all_liaisons_obs = liaisonService.findAll();
  }

  // Hook de cycle de vie Angular

  ngOnInit() {
    this.filteredOptions = this.myControl1.valueChanges.pipe(
      map(value => this._filter(value || '')),
    );

    this.filteredOptions = this.myControl2.valueChanges.pipe(
      map(value => this._filter(value || '')),
    );


    this.all_liaisons_obs.subscribe(x => this.all_liaisons = x)


    this.options_obs.subscribe(
      cards => {
        this.options = cards.map(card => card.reponse)
        this.ids = cards.map(card => Number(card.id))
      }
    );

    this.theme_obs.subscribe(
      x => {
        this.theme = x;
        this.liaison = this.theme.paires;
        this.themenameFC = new FormControl(this.theme.name)
        for (const paire of this.liaison) {
          // Récupérer les détails de la carte et créer des contrôles de formulaire

          this.cardService.findById(Number(paire.id_1)).subscribe(
            carte1 => {
              paire.carte1 = carte1;
              this.indexes1.push(Number(paire.id))
              this.carteControls1[Number(paire.id)] = new FormControl(carte1.reponse);
            }
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => {
              paire.carte2 = carte2;
              this.indexes2.push(Number(paire.id))
              this.carteControls2[Number(paire.id)] = new FormControl(carte2.reponse);
            }
          );

        }
      }
    );
  }

  versAddCard(): void {
    this.router.navigateByUrl('addCard');
  }

  handleInputFocus(type: string, index: number, formcontrolller: FormControl): void {

    //vérification
    this.filteredOptions = formcontrolller.valueChanges.pipe(
      map(value => this._filter(value || '')),
    );


    if (type == 'inputCarte1') {
      this._filter(this.carteControls1[this.indexes1[index]].value)
    }
    if (type == 'inputCarte2') {

      this._filter(this.carteControls2[this.indexes2[index]].value)
    }
  }
  // Gérer le changement de l'input
  handleInputChange(type: string, index: number, formcontrolller: FormControl) {

    if (formcontrolller.value.length > 85) {
      this.showErrorMessage("Limite de 85 caractères atteinte ! ");
      formcontrolller.setValue(formcontrolller.value.slice(0, 100));
    }

    for (let ind of this.indexes1) {
      if (ind != this.indexes1[index]) {
        if (this.carteControls1[this.indexes1[index]].value == this.carteControls1[ind].value && this.carteControls2[this.indexes2[index]].value == this.carteControls2[ind].value) {
          formcontrolller.setValue("");
          this.showErrorMessage('Question existante !');
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

  // Valider et mettre à jour le thème
  async valider() {
    const nom = this.themenameFC.value;
    if (nom == null || nom.trim() === '') {
      // Afficher un message d'erreur ou prendre toute autre action nécessaire
      this.showErrorMessage("Le nom du thème est vide.");
      return; // Arrêter la validation si le nom est vide ou null
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
      const liaison = {id: this.liaison[index].id!!, id_1: id1!!, id_2: id2!!};


      if (id1 == id2) {
        this.showErrorMessage("Une des liaisons a deux choix identiques ! ")
        return;
      }

      if (this.liaison[index].id_1 !== id1 || this.liaison[index].id_2 !== id2) {
        const existingLiaison = this.findExistingLiaison(id1!!, id2!!);

        if (existingLiaison) {
          await liaisons.push(existingLiaison);
        } else {
          const newLiaison = await this.createLiaison(id1!!, id2!!);
          await liaisons.push(newLiaison);
        }
      } else {
        await liaisons.push(liaison);
      }
    }

    if (liaisons.length === 0) {
      this.showErrorMessage("Vous n'avez pas ajouté de dilemme ! ");
      return;
    }

    const theme = {name: String(nom), paires: liaisons};

    this.themeService.update(this.theme_id, theme).subscribe(() => {
      this.router.navigateByUrl("themes");
    });
  }


  async createCard(value: string): Promise<Card> {
    return new Promise((resolve, reject) => {
      const card: Card = {reponse: value};
      this.cardService.create(card).subscribe(
        (newCard: Card) => {
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
    const newLiaison: Liaison = {id_1: id1, id_2: id2};
    return new Promise((resolve, reject) => {
      this.liaisonService.create(newLiaison).subscribe(
        (newLiaison: Liaison) => {
          resolve(newLiaison);
        },
        (error) => {
          console.error("Erreur lors de la création de la liaison:", error);
          reject(error);
        }
      );
    });
  }

  async createOrFindCard(value: string): Promise<number | null> {
    for (let index = 0; index < this.options.length; index++) {
      if (this.options[index] === value) {
        return this.ids[index];
      }
    }

    // Si la carte n'existe pas, créez-la et renvoyez l'ID
    const newCard = await this.createCard(value);
    this.options.push(newCard.reponse);
    this.ids.push(Number(newCard.id));
    return Number(newCard.id);
  }

  async AddLiaison() {
    // Vérifiez si les cartes sont vides
    if (!this.myControl1.value || !this.myControl2.value) {
      this.showErrorMessage("Vous n'avez pas rempli tous les champs, impossible d'ajouter le dilemme");
      return;
    }

    if (this.myControl1.value == this.myControl2.value) {
      this.showErrorMessage("Vous avez renseigné deux choix identiques !");
      return;
    }

    for (let ind of this.indexes1) {
      if (this.myControl1.value == this.carteControls1[ind].value && this.myControl2.value == this.carteControls2[ind].value) {
        this.showErrorMessage('Question existante !');
        return;
      }

    }

    const id1 = await this.createOrFindCard(this.myControl1.value);
    const id2 = await this.createOrFindCard(this.myControl2.value);

    if (id1 !== null && id2 !== null) {
      // Vérifiez si la liaison existe
      const existingLiaison = this.findExistingLiaison(id1, id2);

      if (existingLiaison) {
        this.liaison.push(existingLiaison);
        this.indexes1.push(Number(existingLiaison.id));
        this.carteControls1[Number(existingLiaison.id)] = new FormControl(this.myControl1.value);
        this.indexes2.push(Number(existingLiaison.id));
        this.carteControls2[Number(existingLiaison.id)] = new FormControl(this.myControl2.value);
      } else {
        // Créez une nouvelle liaison
        const newLiaison = await this.createLiaison(id1, id2);
        // Ajoutez la nouvelle liaison à la liste
        this.liaison.push(newLiaison);
        this.indexes1.push(Number(newLiaison.id));
        this.carteControls1[Number(newLiaison.id)] = new FormControl(this.myControl1.value);
        this.indexes2.push(Number(newLiaison.id));
        this.carteControls2[Number(newLiaison.id)] = new FormControl(this.myControl2.value);
      }
    }

    this.myControl1.setValue('');
    this.myControl2.setValue('');
  }

  deleteLiaison(liaison: Liaison) {
    const index = this.liaison.indexOf(liaison); // Trouver l'index de la liaison à supprimer
    this.indexes1.splice(index, 1);
    this.indexes2.splice(index, 1);
    this.liaison.splice(index, 1); // Supprimer la liaison en utilisant splice
  }

  Retour() {
    this.router.navigateByUrl('themes')
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
