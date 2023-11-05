import { Injectable } from '@angular/core';
import { PlayerInfo } from '../models/player-info.model';


@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  players: PlayerInfo[] = [];

  setPlayers(players: PlayerInfo[]) {
    this.players = players;
    localStorage.setItem('players', JSON.stringify(players));
  }

  getPlayers(): PlayerInfo[] {
    if (this.players.length === 0) {
      const storedPlayers = localStorage.getItem('players');
      if (storedPlayers) {
        this.players = JSON.parse(storedPlayers);
      }
    }
    return this.players;
  }
}
