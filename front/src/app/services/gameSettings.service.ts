import {Injectable} from '@angular/core';
import {GameSettingsModel} from "../models/gameSettings.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {
  private gameSettings: GameSettingsModel | null = null;
  private currentMancheSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.loadGameSettings();
  }

  // Méthode pour définir les paramètres du jeu
  setGameSettings(gameSettings: GameSettingsModel): void {
    this.gameSettings = gameSettings;
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
  }

  getCurrentManche(): Observable<number> {
    return this.currentMancheSubject.asObservable();
  }

  // Méthode pour obtenir les paramètres du jeu
  getGameSettings(): GameSettingsModel {
    if (!this.gameSettings) {
      this.loadGameSettings();
    }
    return this.gameSettings as GameSettingsModel;
  }

  incrementCurrentPlayer() {
    if (this.gameSettings) {
      this.gameSettings.currentPlayer++;
      console.log("incrementCurrentPlayer")
      this.saveGameSettings();

      this.currentMancheSubject.next(this.gameSettings.currentPlayer);

    }
  }

  incrementCurrentManche() {
    if (this.gameSettings) {
      console.log("this.gameSettings.currentManche: ", this.gameSettings.currentManche)

      this.gameSettings.currentManche++;
      this.gameSettings.currentPlayer = 0;
      this.saveGameSettings();

      // Mettre à jour la valeur de currentManche dans le BehaviorSubject
      this.currentMancheSubject.next(this.gameSettings.currentManche);
    }
  }

  isLastPlayer(): boolean {
    return !!this.gameSettings?.currentPlayer &&
      !!this.gameSettings?.nombreJoueur &&
      this.gameSettings.currentPlayer === this.gameSettings.nombreJoueur - 1;
  }


  isLastManche(): boolean {
    return !!this.gameSettings?.currentManche &&
      !!this.gameSettings?.nombreManche &&
      this.gameSettings.currentManche === this.gameSettings.nombreManche;
  }

  canIncrementPlayer(): boolean {
    return !!this.gameSettings?.nombreJoueur &&
      this.gameSettings?.currentPlayer !== undefined && this.gameSettings?.currentPlayer >= 0 &&
      this.gameSettings.currentPlayer < this.gameSettings.nombreJoueur - 1;
  }


  private saveGameSettings() {
    if (this.gameSettings) {
      localStorage.setItem('gameSettings', JSON.stringify(this.gameSettings));
    }
  }

  private loadGameSettings() {
    const storedGameSettings = localStorage.getItem('gameSettings');
    if (storedGameSettings) {
      this.gameSettings = JSON.parse(storedGameSettings);
    } else {
      this.gameSettings = {
        nombreManche: 0,
        nombreJoueur: 0,
        currentManche: 1,
        currentPlayer: 0,
      };
      localStorage.setItem('gameSettings', JSON.stringify(this.gameSettings));
    }
  }
}
