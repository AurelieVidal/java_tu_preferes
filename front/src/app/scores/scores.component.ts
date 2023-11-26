import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {PlayerInfo} from "../models/player-info.model";
import {PlayerService} from "../services/player.service";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent {
  nombreJoueur!: number;
  users!: FormGroup;
  players: PlayerInfo[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playerService: PlayerService,) {
    this.users = new FormGroup({});
    this.players = this.playerService.getPlayers();
  }


  onSubmitForm(): void {
    console.log(this.nombreJoueur);
  }

  ngOnInit(): void {

    console.log(this.players)
    this.activatedRoute.params.subscribe(s => {
      this.nombreJoueur = s["nbrJoueur"];
      console.log("le nbr de joueurs est dans le score " + this.nombreJoueur);
    })


    for (let i = 0; i < this.nombreJoueur; i++) {
      console.log("le numéro du joueurs est" + i);

      this.users.addControl('joueur_' + i, new FormGroup({
        nom: new FormControl('')
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
