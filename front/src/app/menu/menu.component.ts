import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

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


  constructor(private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.initFieldImages()
    this.initForm();
  }

  initForm() {
    const formControls: any = {};
    const numberOfPlayers = parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]);

    for (let i = 0; i < numberOfPlayers; i++) {
      formControls[`joueur_${i}`] = new FormGroup({
        pseudo: new FormControl('', [Validators.required]),
        image_path: new FormControl(this.fieldImages['Champ ' + (Math.floor(Math.random() * 15) + 1).toString()]) // Ajoutez le contrôle image_id ici
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
    // Obtenez le champ sélectionné par l'utilisateur à partir de l'événement
    const selectedField = (event.target as HTMLSelectElement).value;
    const selectedImage = this.fieldImages[selectedField];

    // Obtenez le contrôle "image_path" du joueur actuel
    const currentPlayerImageControl = this.users.get(`joueur_${playerIndex}.image_path`);
    console.log('currentPlayerImageControl',currentPlayerImageControl)
    if (currentPlayerImageControl) {
      // Mettez à jour la valeur du contrôle "image_path" avec le champ sélectionné
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
    return undefined; // Retourne undefined si la valeur n'est pas trouvée
  }

  onSubmit() {
    console.log("Valeurs du FormGroup (users):", this.users.value);
    console.log("nb de joueurs " + parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]));
    console.log(this.users.value);
  }
}


