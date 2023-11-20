import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { ThemeModel } from '../models/themes.model';
import { Subscription } from 'rxjs';
import { GameSettingsModel } from "../models/gameSettings.model";
import { PlayerService } from "../services/player.service";
import { GameSettingsService } from "../services/gameSettings.service";
import { CardService } from "../services/card.services";
import { Card } from '../models/card.model';
import {PlayerInfo} from "../models/player-info.model";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {ToggleService} from "../services/toggle.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

export class QuestionsComponent implements OnInit, OnDestroy {
  buttonClicked: boolean = false;

  cardTheme!: ThemeModel;
  idTheme!: number;
  gameSettings!: GameSettingsModel;
  cards!: Card[];
  private cardsSubscription: Subscription | undefined;
  private themeSubscription: Subscription | undefined;
  private currentIdIndex: number = 0;
  cardText: { button_1: string, button_2: string } = { button_1: '', button_2: '' };

  private playerSubscription: Subscription | undefined;
  players!: PlayerInfo[];
  private currentMancheSubscription: Subscription | undefined;
  option1!: string
  option2!: string

  constructor(
    private themeService: ThemeService,
    private gameSettingsService: GameSettingsService,
    public cardService: CardService,
    private playerService : PlayerService,
    private activatedRoute: ActivatedRoute,
    private toggleService: ToggleService
  ) {}

  ngOnInit() {
    this.gameSettings = this.gameSettingsService.getGameSettings();
    this.idTheme = parseInt(this.activatedRoute.snapshot.params["themeId"]);
    console.log(this.idTheme)
    this.themeSubscription = this.themeService.findById(this.idTheme).subscribe((theme) => {

      this.cardTheme = theme;
      this.updateCardText();
    });

    this.gameSettingsService.getCurrentManche().subscribe(() => {
      this.updateCardText();
    });

    this.players = this.playerService.getPlayers();
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
    this.cardsSubscription?.unsubscribe();
  }

  // Mettre à jour cardText en fonction de this.gameSettings.currentManche
  private updateCardText() {
    console.log("updateCardText currentManche: ", this.gameSettings.currentManche)
    const paire = this.cardTheme.paires[this.gameSettings.currentManche-1];

    this.cardService.findById(paire.id_1).subscribe((card) => {
      this.cardText.button_1 = card.reponse;
      this.option1 = card.reponse;
    });

    this.cardService.findById(paire.id_2).subscribe((card) => {
      this.cardText.button_2 = card.reponse;
      this.option2 = card.reponse;
    });



  }

  addVote(button:string) {
    if ( button == 'button_1') {
      this.players[this.gameSettings.currentPlayer].choices.push(this.cardText.button_1 )
    }
    if ( button == 'button_2') {
      this.players[this.gameSettings.currentPlayer].choices.push(this.cardText.button_2 )
    }
    console.log(this.players)
    // Ensuite, désactivez le bouton en mettant la variable buttonClicked sur true.
    this.buttonClicked = true;

  }


  onToggleChange(event: MatButtonToggleChange) {
    const selectedValue = event.value;
    //console.log('Toggle selected:', selectedValue);
    // Vous pouvez maintenant utiliser la valeur sélectionnée comme nécessaire
    this.toggleService.setSelected(selectedValue)
  }
}
