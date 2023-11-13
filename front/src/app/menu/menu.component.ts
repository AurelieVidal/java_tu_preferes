import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { PlayerService } from "../services/player.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterOutlet, NgForOf],

})

export class MenuComponent implements OnInit{
  users!: FormGroup;
  fields: string[] = Array.from({ length: 15 }, (_, i) => `Champ ${i + 1}`);
  fieldImages: { [key: string]: string } = {};
  nombreManche!: number;
  nombreJoueur!: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private playerService: PlayerService){
  }

  ngOnInit(): void {
    this.initFieldImages()
    this.initForm();
  }

  initForm() {
    const formControls: any = {};
    const numberOfPlayers = parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]);
    this.activatedRoute.params.subscribe(s=>{
      this.nombreJoueur=numberOfPlayers;
        this.nombreManche=s["nbManche"];
        console.log("le nbr de manche est "+this.nombreManche+"le nbr de joueur est"+this.nombreJoueur);
      }
    )

    for (let i = 0; i < numberOfPlayers; i++) {
      formControls[`joueur_${i}`] = new FormGroup({
        pseudo: new FormControl('', [Validators.required]),
        image_path: new FormControl(this.fieldImages['Champ ' + (Math.floor(Math.random() * 15) + 1).toString()]),
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
  updateImage(playerIndex: number, event: Event) {
    const selectedField = (event.target as HTMLSelectElement).value;
    const selectedImage = this.fieldImages[selectedField];

    const currentPlayerImageControl = this.users.get(`joueur_${playerIndex}.image_path`);
    console.log('currentPlayerImageControl',currentPlayerImageControl)
    if (currentPlayerImageControl) {
      currentPlayerImageControl.setValue(selectedImage);
    }
  }

  getImageUrl(playerIndex : number): string {
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

    this.router.navigateByUrl('game');

  }
}


