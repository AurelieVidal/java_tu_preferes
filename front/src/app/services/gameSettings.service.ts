import { Injectable } from '@angular/core';
import { GameSettingsModel} from "../models/gameSettings.model";

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {
  private gameSettings: GameSettingsModel = {
    nombreManche: 1, // Valeur par défaut
    nombreJoueur: 2  // Valeur par défaut
  };

  constructor() { }

  // Méthode pour obtenir les paramètres du jeu
  getGameSettings(): GameSettingsModel {
    return this.gameSettings;
  }

  // Méthode pour définir les paramètres du jeu
  setGameSettings(settings: GameSettingsModel): void {
    this.gameSettings = settings;
  }
}
