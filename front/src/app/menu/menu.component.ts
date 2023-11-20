import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { PlayerService } from "../services/player.service";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonBigComponent } from '../button-big/button-big.component';
import {AppModule} from "../app.module";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  //standalone: true,
  //imports: [ReactiveFormsModule, NgIf, RouterOutlet, NgForOf, MatInputModule, MatOptionModule, MatSelectModule, ButtonBigComponent],
})

export class MenuComponent implements OnInit{
  users!: FormGroup;
  characters: string[] = ['Micheal', 'Jim', 'Dwight', 'Meredith', 'Pam', 'Standley', 'Angela', 'Kevin', 'Kelly', 'Tobby', 'Phyllis', 'Ryan', 'Creed', 'Oscars', 'Andy'];
  fields: string[] = Array.from({ length: 15 }, (_, i) => `${this.characters[i]}`);
  fieldImages: { [key: string]: string } = {};
  nombreManche!: number;
  nombreJoueur!: number;
  idTheme!: number



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private playerService: PlayerService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initFieldImages()
    this.initForm();
    this.idTheme = parseInt(this.activatedRoute.snapshot.params["idTheme"]);
  }

  initForm() {
    const formControls: any = {};
    const numberOfPlayers = parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]);
    this.activatedRoute.params.subscribe(s => {
      this.nombreJoueur = numberOfPlayers;
      this.nombreManche = s["nbManche"];
      console.log("le nbr de manche est " + this.nombreManche + "le nbr de joueur est" + this.nombreJoueur);
    })

    for (let i = 0; i < numberOfPlayers; i++) {
      let number = (Math.floor(Math.random() * 15));
      formControls[`joueur_${i}`] = new FormGroup({

        pseudo: new FormControl('', [Validators.required]),
        image_path: new FormControl(this.fieldImages[this.characters[number]]),
        image_path_display: new FormControl(this.characters[number]),
        //vote: new FormArray([]),
      });
    }
    this.users = new FormGroup(formControls);
  }

  initFieldImages() {
    for (let i = 0; i < this.fields.length; i++) {
      this.fieldImages[this.fields[i]] = `assets/images/${i + 1}.jfif`;
    }
  }

  updateImage(playerIndex: number, event: MatSelectChange) {
    console.log("DANS UPDATE");
    const selectedField = event.value;
    console.log(selectedField)
    const selectedImage = this.fieldImages[selectedField];

    console.log("IMAGE " + selectedImage);

    const currentPlayerImageControl = this.users.get(`joueur_${playerIndex}`);
    console.log('currentPlayerImageControl', currentPlayerImageControl);

    if (currentPlayerImageControl) {
      currentPlayerImageControl.get('image_path')?.setValue(selectedImage);
      currentPlayerImageControl.get('image_path_display')?.setValue(selectedField);
    }
  }

  getImageUrl(playerIndex: number): string {
    return this.users.value[`joueur_${playerIndex}`]["image_path"]
  }

  getControlNames(formGroup: FormGroup): string[] {
    return Object.keys(formGroup.controls);
  }

  getKeyByValue(value: string): string | undefined {
    for (const key in this.fieldImages) {
      if (this.fieldImages.hasOwnProperty(key) && this.fieldImages[key] === value) {
        return key;
      }
    }
    return undefined;
  }

  onSubmit() {
    // Vérifier si le formulaire est valide
    if (this.users.valid) {
      const playerData = this.users.value;
      const numberOfPlayers = parseInt(this.activatedRoute.snapshot.params['nbrJoueur']);

      // Créez un tableau pour stocker les informations des joueurs
      const players = [];

      // Vérifier si chaque joueur a renseigné son pseudo et s'il est unique
      let isFormValid = true;
      const usedPseudos = new Set<string>();

      for (let i = 0; i < numberOfPlayers; i++) {
        const playerFormGroup = this.users.get(`joueur_${i}`) as FormGroup;

        const pseudo = playerFormGroup.get('pseudo')?.value;

        if (!pseudo || usedPseudos.has(pseudo)) {
          // Afficher un message d'erreur ou prendre une action appropriée
          console.error(`Le joueur ${i + 1} n'a pas renseigné son pseudo ou le pseudo est déjà utilisé.`);
          this.showErrorMessage(`Le pseudo du joueur ${i + 1} est déjà utilisé !`);
          isFormValid = false;
          break;  // Sortir de la boucle si un joueur n'a pas renseigné son pseudo ou si le pseudo est déjà utilisé
        }

        usedPseudos.add(pseudo);

        const playerInfo = {
          pseudo: pseudo,
          image_path: playerFormGroup.get('image_path')?.value,
          choices: [],
          predictions: []
        };
        players.push(playerInfo);
      }

      // Soumettre le formulaire seulement si tous les joueurs ont renseigné leur pseudo et les pseudos sont uniques
      if (isFormValid) {
        // Enregistre les informations des joueurs dans le service PlayerService
        this.playerService.setPlayers(players);

        this.router.navigateByUrl('game/' + this.idTheme);
      }

      // Soumettre le formulaire seulement si tous les joueurs ont renseigné leur pseudo
      if (isFormValid) {
        // Enregistre les informations des joueurs dans le service PlayerService
        this.playerService.setPlayers(players);

        this.router.navigateByUrl('game/' + this.idTheme);
      }
    } else {
      // Afficher un message d'erreur ou prendre une action appropriée si le formulaire n'est pas valide
      this.showErrorMessage('Veuillez renseigner tous les pseudos');
    }
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000, // Durée d'affichage du toast en millisecondes
    });
  }

}


