import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent {
  nombreJoueur!: number;
  users!: FormGroup;

constructor(private router: Router, private activatedRoute: ActivatedRoute){
  this.users = new FormGroup({});
}

/*onContinue(): void{
  this.router.navigateByUrl('menu/'+this.nombreJoueur+'/'+this.nombreManche);
}*/
onSubmitForm():void {
  console.log(this.nombreJoueur);
}

ngOnInit(): void {
  this.activatedRoute.params.subscribe(s => {
    this.nombreJoueur = s["nbrJoueur"];
    console.log("le nbr de joueurs est dans le score " + this.nombreJoueur);
  })


  for (let i = 0; i < this.nombreJoueur; i++) {
    console.log("le numéro du joueurs est" + i);

    this.users.addControl('joueur_' + i, new FormGroup({
      nom: new FormControl('')
      // Ajoutez d'autres champs de formulaire si nécessaire
    }));

  }
}
  getNumberArray(n: number): any[] {
    return Array(n);
  }

  onSubmit() {
    console.log("Valeurs du FormGroup (users):", this.users.value);
    console.log("nb de joueurs " + parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]));
    console.log(this.users.value);
  }

}