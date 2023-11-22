import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SliderService} from "../services/slider.service";
import {Subscription} from "rxjs";
import { GameSettingsModel } from "../models/gameSettings.model";
import { GameSettingsService } from "../services/gameSettings.service";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slidervalue!: number
  gameSettings!: GameSettingsModel
  nbPlayers!: number


  constructor(private sliderSerevice: SliderService,
              private gameSettingsService: GameSettingsService,) {
  }

  get audioPlayerRef(): ElementRef {
    return this._audioPlayerRef;
  }

  set audioPlayerRef(value: ElementRef) {
    this._audioPlayerRef = value;
  }
  @ViewChild('audioPlayer', {static: false}) private _audioPlayerRef!: ElementRef;

  sliderValue: number = 50;

  ngOnInit() {
    this.gameSettings = this.gameSettingsService.getGameSettings();
    this.nbPlayers = this.gameSettings.nombreJoueur
    this.slidervalue = Math.round(this.sliderSerevice.getValue()*this.gameSettings.nombreJoueur/100)


    console.log('Valeur actuelle du slider :', this.sliderValue);
    this.updateBeforeAfterWidth();
  }

  onSliderChange() {
    const audioPlayer = this.audioPlayerRef.nativeElement as HTMLAudioElement;
    audioPlayer.play();
    const value = (this.sliderValue - 1) / 99;
    this.slidervalue = Math.round(this.sliderSerevice.getValue()*this.gameSettings.nombreJoueur/100)
    //console.log('Valeur actuelle du slider :', this.sliderValue);
    this.sliderSerevice.setValue(this.sliderValue);
    this.updateBeforeAfterWidth();
  }

  private updateBeforeAfterWidth() {
    const value = (this.sliderValue - 1) / 99;
    const beforeWidth = value * 100;
    const afterWidth = (1 - value) * 100;

    const beforeElement = document.querySelector('.before') as HTMLElement;
    const afterElement = document.querySelector('.after') as HTMLElement;

    if (beforeElement && afterElement) {
      beforeElement.style.width = beforeWidth + '%';
      afterElement.style.width = afterWidth + '%';
    }
  }





}
