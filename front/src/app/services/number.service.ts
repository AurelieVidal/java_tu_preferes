import { Injectable } from '@angular/core';

@Injectable()
export class NumberService {
  private sharedJoueur: number = 2;
  private sharedManche: number = 2;

  getValueJoueur(): number {
    return this.sharedJoueur;
  }

  setValueJoueur(value: number): void {
    this.sharedJoueur = value;
  }

  getValueManche(): number {
    return this.sharedManche;
  }

  setValueManche(value: number): void {
    this.sharedManche = value;
  }
}
