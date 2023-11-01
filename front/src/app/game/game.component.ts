import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PlayerService } from "../services/player.service";
import { PlayerInfo } from "../models/player-info.model";
import { GameSettingsModel } from "../models/gameSettings.model";
import { GameSettingsService } from "../services/gameSettings.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  players: PlayerInfo[] = [{pseudo:"", image_path:""}];
  gameSettings: GameSettingsModel = { nombreManche: 0, nombreJoueur: 0 };

  currentManche: number = 1;
  currentPlayer: number = 0;
  goToNextManche: boolean = false;

  constructor(
    private playerService: PlayerService,
    private gameSettingsService: GameSettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.players = this.playerService.getPlayers();
    this.gameSettings = this.gameSettingsService.getGameSettings();
    console.log('composant game: ', this.players);
  }

  nextPlayer() {
    this.currentPlayer++;
    if (this.currentPlayer + 1 >= this.gameSettings.nombreJoueur) {
      this.goToNextManche = true;
    }
    console.log('goToNextManche:', this.goToNextManche);
  }

  nextManche() {
      console.log(this.currentManche)
      this.currentManche++;
      this.currentPlayer = 0;
      this.goToNextManche = false
  }

  nextPlayerOrManche() {
    // La dernière manche a été jouée
    if (this.currentManche === this.gameSettings.nombreManche && this.goToNextManche) {
      this.router.navigate(['/scores']);
    }
    // Passez au joueur suivant
    else if (this.currentPlayer < this.gameSettings.nombreJoueur - 1) {
      this.nextPlayer();
    }
    else if (this.goToNextManche) {
      this.nextManche();
    }
  }
}
