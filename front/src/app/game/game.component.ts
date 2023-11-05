import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PlayerService } from "../services/player.service";
import { PlayerInfo } from "../models/player-info.model";
import { GameSettingsService } from "../services/gameSettings.service";
import {GameSettingsModel} from "../models/gameSettings.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  gameSettings!: GameSettingsModel

  constructor(
    private playerService: PlayerService,
    private gameSettingsService: GameSettingsService,
    private router: Router
  ) {}

  players: PlayerInfo[] = [{pseudo: "", image_path: "", vote:['']}];
  goToNextManche: boolean = false;

  ngOnInit() {
    this.gameSettings = this.gameSettingsService.getGameSettings()
    this.players = this.playerService.getPlayers();
  }

  nextPlayer() {
    this.gameSettingsService.incrementCurrentPlayer();

    if (this.gameSettingsService.isLastPlayer()) {
      this.goToNextManche = true;
    }
  }

  nextManche() {
    this.gameSettingsService.incrementCurrentManche();
    this.goToNextManche = false;
  }

  nextPlayerOrManche() {
    console.log(this.gameSettingsService.isLastManche() && this.goToNextManche)
    console.log(this.gameSettingsService.canIncrementPlayer())

    if (this.gameSettingsService.isLastManche() && this.goToNextManche) {
      this.router.navigate(['/scores']);
    } else if (this.gameSettingsService.canIncrementPlayer()) {
      this.nextPlayer();
    } else if (this.goToNextManche) {
      this.nextManche();
    }
  }
}
