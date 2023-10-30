import { Injectable } from '@angular/core';
import { PlayerInfo } from '../models/player-info.model';


@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  players: PlayerInfo[] = [];

  setPlayers(players: PlayerInfo[]) {
    this.players = players;
    console.log('player service', this.players)
  }

  getPlayers() {
    return this.players;
  }
}
