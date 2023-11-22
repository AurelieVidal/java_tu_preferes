import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import { PlayerService } from "../services/player.service";
import { PlayerInfo } from "../models/player-info.model";
import { GameSettingsModel } from "../models/gameSettings.model";
import { GameSettingsService } from "../services/gameSettings.service";
import {ToggleService} from "../services/toggle.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {SliderService} from "../services/slider.service";
import {Location, ViewportScroller} from '@angular/common';

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
    private router: Router,
    private toggleService: ToggleService,
    private snackBar: MatSnackBar,
    private sliderService: SliderService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private viewportScroller: ViewportScroller,
  ) {
    this.players = this.playerService.getPlayers();
  }

  players: PlayerInfo[];
  goToNextManche: boolean = false;

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.gameSettings = this.gameSettingsService.getGameSettings()
    console.log(this.gameSettings)
    if (this.gameSettingsService.isLastPlayer()) {
      this.goToNextManche = true;
    }
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
    console.log("SCORE ?")
    console.log(this.gameSettingsService.isLastManche() && this.goToNextManche)
    console.log(this.gameSettingsService.canIncrementPlayer())
    if (this.toggleService.getSelected() == "none"){
      this.showErrorMessage("Veuillez choisir entre les deux propositions")
      return;
    }

    this.players[this.gameSettings.currentPlayer].choices.push(this.toggleService.getSelected())
    this.players[this.gameSettings.currentPlayer].predictions.push(Math.round(this.sliderService.getValue()*this.gameSettings.nombreJoueur/100))
    this.playerService.setPlayers(this.players)
    console.log(this.players)

    if (this.gameSettingsService.isLastManche() && this.goToNextManche) {
      this.router.navigate(['/scores']);
    } else if (this.gameSettingsService.canIncrementPlayer()) {
      console.log("CHANGEMENT DE JOUEUR")
      this.nextPlayer();
      //window.location.reload();
      this.reloadCurrentRoute();
    } else if (this.goToNextManche) {
      console.log("CHANGEMENT DE MANCHE")
      this.nextManche();
      this.reloadCurrentRoute();
    }

    //this.router.navigateByUrl('game/'+this.activatedRoute.snapshot.params["themeId"])
    //this.ngOnInit()

  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }


  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000, // Durée d'affichage du toast en millisecondes
    });
  }
}
