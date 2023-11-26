import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {ThemeModel} from '../models/themes.model';
import {Subscription} from 'rxjs';
import {GameSettingsModel} from "../models/gameSettings.model";
import {PlayerService} from "../services/player.service";
import {GameSettingsService} from "../services/gameSettings.service";
import {CardService} from "../services/card.services";
import {Card} from '../models/card.model';
import {PlayerInfo} from "../models/player-info.model";
import {ActivatedRoute} from "@angular/router";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {ToggleService} from "../services/toggle.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

export class QuestionsComponent implements OnInit, OnDestroy {
  cardTheme!: ThemeModel;
  idTheme!: number;
  gameSettings!: GameSettingsModel;

  cardText: { button_1: string, button_2: string } = {button_1: '', button_2: ''};
  players!: PlayerInfo[];
  option1!: string
  option2!: string
  private cardsSubscription: Subscription | undefined;
  private themeSubscription: Subscription | undefined;


  constructor(
    private themeService: ThemeService,
    private gameSettingsService: GameSettingsService,
    public cardService: CardService,
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute,
    private toggleService: ToggleService
  ) {
  }

  ngOnInit() {
    this.gameSettings = this.gameSettingsService.getGameSettings();
    this.idTheme = parseInt(this.activatedRoute.snapshot.params["themeId"]);
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


  onToggleChange(event: MatButtonToggleChange) {
    const selectedValue = event.value;
    this.toggleService.setSelected(selectedValue)
  }

  // Met à jour cardText en fonction de this.gameSettings.currentManche
  private updateCardText() {
    const paire = this.cardTheme.paires[this.gameSettings.currentManche - 1];

    this.cardService.findById(paire.id_1).subscribe((card) => {
      this.cardText.button_1 = card.reponse;
      this.option1 = card.reponse;
    });

    this.cardService.findById(paire.id_2).subscribe((card) => {
      this.cardText.button_2 = card.reponse;
      this.option2 = card.reponse;
    });


  }
}
