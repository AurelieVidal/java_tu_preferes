import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { PlayerService } from "../services/player.service";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterOutlet, NgForOf, MatInputModule, MatOptionModule, MatSelectModule],

})

export class MenuComponent implements OnInit{
  users!: FormGroup;
  fields: string[] = Array.from({ length: 15 }, (_, i) => `Champ ${i + 1}`);
  fieldImages: { [key: string]: string } = {};
  nombreManche!: number;
  nombreJoueur!: number;
  idTheme!: number

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private playerService: PlayerService) {
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
      let number = (Math.floor(Math.random() * 15) + 1).toString();
      formControls[`joueur_${i}`] = new FormGroup({

        pseudo: new FormControl('', [Validators.required]),
        image_path: new FormControl(this.fieldImages['Champ ' + number]),
        image_path_display: new FormControl('Champ ' + number),
        vote: new FormArray([]),
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
    const playerData = this.users.value;
    const numberOfPlayers = parseInt(this.activatedRoute.snapshot.params['nbrJoueur']);

    // Créez un tableau pour stocker les informations des joueurs
    const players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      const playerInfo = {
        pseudo: playerData[`joueur_${i}`].pseudo,
        image_path: playerData[`joueur_${i}`].image_path,
        vote: [""]
      };
      players.push(playerInfo);
    }

    // Enregistre les informations des joueurs dans le service PlayerService
    this.playerService.setPlayers(players);

    this.router.navigateByUrl('game/' + this.idTheme);
  }
}


