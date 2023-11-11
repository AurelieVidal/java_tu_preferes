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

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

export class QuestionsComponent implements OnInit, OnDestroy {
  buttonClicked: boolean = false;

  cardTheme!: ThemeModel;
  gameSettings!: GameSettingsModel;
  cards!: Card[];
  private cardsSubscription: Subscription | undefined;
  private themeSubscription: Subscription | undefined;
  private currentIdIndex: number = 0;
  cardText: { button_1: string, button_2: string } = { button_1: '', button_2: '' };

  private playerSubscription: Subscription | undefined;
  players: PlayerInfo[] = [{pseudo: "", image_path: "", vote:[]}];
  private currentMancheSubscription: Subscription | undefined;

  constructor(
    private themeService: ThemeService,
    private gameSettingsService: GameSettingsService,
    public cardService: CardService,
    private playerService : PlayerService,
  ) {}

  ngOnInit() {
    this.gameSettings = this.gameSettingsService.getGameSettings();

    this.themeSubscription = this.themeService.findById(1).subscribe((theme) => {
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
    const paire = this.cardTheme.paires[this.gameSettings.currentManche];

    this.cardService.findById(paire.id_1).subscribe((card) => {
      this.cardText.button_1 = card.reponse;
    });

    this.cardService.findById(paire.id_2).subscribe((card) => {
      this.cardText.button_2 = card.reponse;
    });
  }

  addVote(button:string) {
    if ( button == 'button_1') {
      this.players[this.gameSettings.currentPlayer].vote.push(this.cardText.button_1 )
    }
    if ( button == 'button_2') {
      this.players[this.gameSettings.currentPlayer].vote.push(this.cardText.button_2 )
    }
    console.log(this.players)
    // Ensuite, désactivez le bouton en mettant la variable buttonClicked sur true.
    this.buttonClicked = true;

  }
}
